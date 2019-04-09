
namespace game {

    export class InputFilter extends ut.EntityFilter {
        input: game.Input;
    }

    @ut.requiredComponents(game.Input)
    export class InputSystem extends ut.ComponentSystem {
        filter = new InputFilter();

        OnUpdate(): void {
            this.filter.ForEach(this.world, (entity) => {
                let data = this.filter;

                data.input.InputCommands.forEach((inputCommand) => {
                    if (ut.Core2D.Input.getKeyDown(inputCommand.KeyCode)) {
                        try {
                            CommandService.performCommand(inputCommand.Command, this.world, entity);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })
            });
        }
    }
}