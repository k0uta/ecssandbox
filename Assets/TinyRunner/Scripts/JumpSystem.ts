
namespace game {
    const speedMinValue = 0.0000000001;

    @ut.requiredComponents(ut.Physics2D.Velocity2D)
    @ut.requiredComponents(game.Jump)
    export class JumpSystem extends ut.ComponentSystem {

        OnUpdate(): void {

            this.world.forEach([ut.Entity, ut.Physics2D.Velocity2D, game.Jump], (entity, velocity, jump) => {
                if (!jump.JumpStarted) {
                    jump.JumpStarted = true;

                    let setVelocity = new ut.Physics2D.SetVelocity2D(velocity.velocity.add(new Vector2(0, jump.JumpSpeed)));
                    this.world.setOrAddComponentData(entity, setVelocity);
                    jump.IsJumping = true;
                } else {
                    jump.IsJumping = Math.abs(velocity.velocity.y) > speedMinValue;
                }
            });
        }
    }
}
