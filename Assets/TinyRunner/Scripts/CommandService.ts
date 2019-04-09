namespace game {
    export class CommandService {

        static commandToFunction = {
            [game.Command.Jump]: CommandService.Jump
        }

        static performCommand(command: game.Command, world: ut.World, entity: ut.Entity) {
            const commandFunction = this.commandToFunction[command];

            if (!commandFunction) {
                throw new Error(`Command (${command}) not implemented!`);
            }

            commandFunction(world, entity);
        };

        static Jump(world: ut.World, entity: ut.Entity) {
            world.usingComponentData(entity, [game.Movement], (movement) => {
                movement.Speed += 10;
            })
        };
    }
}