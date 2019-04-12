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

        };

        static Accelerate(world: ut.World, entity: ut.Entity) {

        };
    }
}