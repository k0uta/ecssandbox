
namespace game {

    export class MovementFilter extends ut.EntityFilter {
        position: ut.Core2D.TransformLocalPosition;
        movement: game.Movement;
    }

    /** New System */
    export class MovementSystem extends ut.ComponentSystem {
        filter = new MovementFilter();

        OnUpdate():void {
            const dt = this.scheduler.deltaTime();

            this.filter.ForEach(this.world, () => {
                let data = this.filter;
                let newPosition = data.position.position.add(new Vector3(data.movement.Speed * dt));
                data.position.position = newPosition;
            })
        }
    }
}
