
namespace game {
    let once = false;
    const debug = true;
    export class TileColliderSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            if (once) {
                return;
            }

            once = true;

            this.world.forEach([ut.Entity, ut.Tilemap2D.Tilemap], (_, tilemap) => {
                tilemap.tiles.forEach((tileData) => {
                    let tilePosition = new Vector3(tileData.position.x + 0.5, tileData.position.y + 0.5);
                    let tileBlockSprite = ut.EntityGroup.instantiate(this.world, 'game.Tileblock')[0];
                    this.world.usingComponentData(tileBlockSprite, [ut.Core2D.TransformLocalPosition, ut.Core2D.Sprite2DRenderer], (position, sprite2DRenderer) => {
                        position.position = tilePosition;
                        sprite2DRenderer.color.a = debug ? 0.2 : 0;
                    });
                })
            });
        }
    }
}