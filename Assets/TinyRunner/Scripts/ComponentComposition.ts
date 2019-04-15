namespace game {
    export class ComponentComposition {
        static GetClassFromString(className: string): any {
            let path = className.split("\.");
            let result = window;
            path.forEach((pathNode) => {
                result = result[pathNode];
            });

            return result;
        }

        static RemoveStateComponents(world: ut.World, entity: ut.Entity, stateComponents: ut.Entity): void {
            let componentNames = world.getComponentData(stateComponents, game.ComponentList);
            componentNames.Components.forEach((componentName) => {
                let componentClass = ComponentComposition.GetClassFromString(componentName);
                world.removeComponent(entity, componentClass);
            })
        }

        static AddStateComponents(world: ut.World, entity: ut.Entity, stateComponents: ut.Entity): void {
            let componentNames = world.getComponentData(stateComponents, game.ComponentList);
            componentNames.Components.forEach((componentName) => {
                let componentClass = ComponentComposition.GetClassFromString(componentName);
                let componentData = world.getComponentData(stateComponents, componentClass);
                console.log("Add " + componentName);

                world.addComponentData(entity, componentData);
            })
        }

        static GetComponentDataFromClassName(world: ut.World, entity: ut.Entity, className: string): any {
            let componentClass = this.GetClassFromString(className);
            return world.getComponentData(entity, componentClass);
        }
    }
}