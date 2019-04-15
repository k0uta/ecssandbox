namespace game {

    /** New System */
    export class FiniteStateMachineSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach([ut.Entity, game.FiniteStateMachine, game.FiniteStateTransition], (entity, fsm, fsmTransition) => {
                let performTransition = true;
                fsmTransition.ComponentCondition.forEach((condition) => {
                    if (!this.EvaluateCondition(entity, condition)) {
                        performTransition = false;
                    }
                });

                if (performTransition) {
                    fsm.NextState = fsmTransition.TransitionState;
                }
            });

            // Tried to use
            // this.world.forEach([ut.Entity, game.FiniteStateMachine], [ut.Optional(game.FiniteStateTransition)], (entity: ut.Entity, fsm: game.FiniteStateMachine, fsmTransition: game.FiniteStateTransition) => {
            this.world.forEach([ut.Entity, game.FiniteStateMachine], (entity, fsm) => {
                if (fsm.CurrentState != fsm.NextState) {
                    let currentStateFilter = fsm.States.filter(stateComponent => stateComponent.StateName == fsm.CurrentState);
                    if (currentStateFilter.length > 0) {
                        ComponentComposition.RemoveStateComponents(this.world, entity, currentStateFilter[0].StateComponents);
                    }

                    let nextStateComponents = fsm.States.filter(stateComponent => stateComponent.StateName == fsm.NextState)[0].StateComponents;
                    ComponentComposition.AddStateComponents(this.world, entity, nextStateComponents);

                    fsm.CurrentState = fsm.NextState;
                }
            });


        }

        EvaluateCondition(entitiy: ut.Entity, condition: ComponentCondition): boolean {
            let data = ComponentComposition.GetComponentDataFromClassName(this.world, entitiy, condition.Component);
            let conditionFormula = `${data[condition.Target]} ${condition.Condition}`;

            return eval(conditionFormula);
        }
    }
}