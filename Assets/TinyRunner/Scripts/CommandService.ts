namespace game {
    export class CommandService {

        static commandToFunction = {
            [game.Command.Jump]: CommandService.Jump,
            [game.Command.Accelerate]: CommandService.Accelerate
        }

        static performCommand(command: game.Command, world: ut.World, entity: ut.Entity) {
            const commandFunction = this.commandToFunction[command];

            if (!commandFunction) {
                throw new Error(`Command (${command}) not implemented!`);
            }

            commandFunction(world, entity);
        };

        static Jump(world: ut.World, entity: ut.Entity) {
            if (world.hasComponent(entity, game.Jump)) {
                return;
            }

            // TODO: Improve component instantiation to get values from command
            let jumpComponent = new game.Jump();
            jumpComponent.JumpSpeed = 5;
            world.addComponentData(entity, jumpComponent);
        };

        static Accelerate(world: ut.World, entity: ut.Entity) {
        };
    }
}