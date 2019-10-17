# Angular Docs and Versions

## Docs

	https://angular.io/

## Versions
* Saltos de versiones con cambios importantes:
	- 2-4 (http -> httpClient)
	- 5-6 (rxjs v6)
* What's new in angular 8 (fines de Mayo): 
	- typescript 3.4
	- Ivy (new compiler, before it was View Engine), better build times, better build sizes
	- new features: forms, router, service worker
	- http was already deprecated, now it's completely removed
		
---
---
# Crear nuevo proyecto usando Angular CLI

Para esto van a necesitar:
- nodejs 10.9.0 o superior
- angular CLI: `npm install -g @angular/cli`

**IMPORTANTE !!!**
: Cuando se ejecuta el comando ng new, el proceso realiza varias preguntas, una de ellas es que hojas de estilo se van a utilizar y deben elegir SCSS.
Acabo de descubrir que, dependiendo de con que consola se tire el ng new, las preguntas aparecen o no (aun no descubri por que). El problema es que si no aparecen, no tienen la posibilidad de elegir SCSS, y por default el proyecto va a terminar utilizando CSS. Posteriormente, se puede cambiar a mano, pero es bastante tedioso.
Para prevenir esto, les recomiendo que ejecuten el ng new con una opcion extra (--styles) que fuerza el uso de SCSS desde el vamos.

Para crear el proyecto:
- `ng new nombre-del-proyecto --style=scss`

**NOTA**
: si les llega a preguntar si quieren usar Angular Routing, pongan que si.
	
## Agregar bootstrap:
Asegurense de estar posicionados dentro del folder del proyecto, donde este la carpeta node_modules.
1. Ejecutar: `npm install -s bootstrap jquery popper`

**NOTA**
: es importante que agreguen el -s (o --save) para que se actualice el package.json (este file es como el pom.xml). Cuando finalice la instalacion de bootstrap van a ver que en el package.json se agregaron automaticamente las dependencias:
```
"bootstrap": "^4.3.1",
"jquery": "^3.4.1",
"popper": "^1.0.1",
```
Si no las ven, es porque se olvidaron el -s o --save.

2. Agregar la hoja de estilos de bootstrap. Para eso, en el file styles.scss agregar en la linea 1:
`@import "../node_modules/bootstrap/scss/bootstrap";`

**NOTA**
: si el styles.scss se llama styles.css es porque se olvidaron el --style=scss al momento de generar el proyecto. Si recien crean el proyecto, lo mas facil es empezar de cero. Si es un proyecto existente se puede 'migrar' haciendo un monton de cambios manuales muy tediosos, asi que traten de no olvidarse de eso, o al menos no darse cuenta tarde, ja.

## Ejecutar la aplicacion:
- Ejecutar `ng serve --open`
**NOTA**
: el --open lo que hace es abrir automaticamente el browser, pueden omitirlo y abrir la url a mano.

A partir de este momento, cada cambio que realicen, al momento de guardarlo va a refrescar automaticamente el browser y los cambios se van a hacer visibles en el.
Si el cambio, es un cambio en una dependencia o algo a nivel del app.module, les recomiendo que detengan el ng serve y lo vuelvan a ejecutar.

- Ademas, pueden probar de ejecutar `ng test`, para ver que los test creados por default no estan rotos.

---
---
# Creacion de Modules
Al generar el proyecto con ng new, se crea automaticamente el modulo AppModule.
Este modulo va a contener en su interior los demas modulos que se vayan creando, nunca va a haber modulos fuera del mismo. Considerenlo como un root module.

Recuerden que los modules son una especie de paquetes que agrupan components, services, pipes, etc.
Ademas de este 'root module', existen otros tres tipos de modules:
* Core Module: donde se guardan aquellos componentes que van a comportarse como singletons. Este tambien es el lugar donde poner todos o casi todos los services. Solo vamos a tener un modulo de tipo core.
* Shared Module: donde se guardan aquellos componentes 'genericos' que pueden ser reutilizados en otros modules. Por lo general, hay uno solo, pero podria haber mas. Tambien pueden contener pipes y directives, pero no se recomienda agregar services.
* Feature Modules: se crea uno por cada feature en la que se pueda dividir la aplicacion. Estos dependen del modelo de negocio. Por lo general hay varios. Agrupan mayormente componentes, pero en determinados casos podrian contener algunos services.

## Creacion de core, shared y feature modules:
Todos los modulos se crean de la misma forma sin importar de que tipo sean. Para eso se utiliza el comando:

`ng generate module nombre-del-modulo`

```
ng generate module core
ng generate module shared
ng generate module contacts --routing=true
```

A los feature modules por lo general tienen un routing module. Esto se explicara mas adelante.

**OJO!**
: que el nombre del modulo sea, por ejemplo, 'core' no 'core-module' sino se va a generar un modulo con el nombre CoreModuleModule.

**OJO2!**
: deben estar parados en el folder app.

Si generan el modulo con ese comando, se va a generar una nueva carpeta con el nombre del modulo, y dentro de la misma un module.ts file.
Se pueden usar algunas 'opciones' adicionales en el comando de CLI, las mas utiles son:

`--flat=true|false`	When true, creates the new files at the top level of the current project root. Default: false.

`--routing=true|false`	When true, creates a routing module. Default: false.

Pueden consultar todas las opciones en https://angular.io/cli/generate#module

## Modules: decorator and metadata

Los modulos se identifican a traves del decorator @NgModule y su metadata contiene:
* declarations: indica que componentes/pipes/directives pertenecen al presente modulo.
* exports: cuales de sus componentes/pipes/directives se quieren hacer publicos.
* imports: importan otros modulos de la aplicacion como de terceros, permitiendo consumir todo lo que los mismos estenexportando.
* entryComponents: aquellos componentes que no se vayan a incluir en el routing, ni vayan a ser referenciados en un template. Este es el caso de los modales.
* bootstrat: solo presente en el AppModule, indica el componente 'inicial' de la aplicacion. Por lo general, es el AppComponent.
* providers: se usa en casos excepcionales para agregar services que no sean singleton.

## Seteos iniciales

* Siempre importar el modulo BrowserModule en el AppModule.

	BrowserModule -> Exports required infrastructure for all Angular apps. Re-exports CommonModule and ApplicationModule.

* En cada modulo que tenga routing, importar el routing module en su modulo relacionado.
* Los feature modules, por lo general, van a importar el SharedModule. Opcionalmente, se puede quitar el CommonModule del import de los feature modules. Importarlo y exportarlo en el SharedModule y por ultimo, importar el ShareModule en cada feature module. Angular doc recomienda hacer eso: https://angular.io/guide/sharing-ngmodules.

	CommonModule -> Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on.

* Importar CoreModule en AppModule.

**IMPORTANTE !!** CoreModule solo debe importarse una unica vez (en el AppModule). Para asegurarnos que no sea importado por segunda vez, se agrega el siguiente codigo en el constructor del CoreModule:

```
constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
  if (parentModule) {
    throw new Error(
      'CoreModule is already loaded. Import it in the AppModule only');
  }
}
```

# Creacion de Componentes

Los componentes se generan con el comando de CLI:

`ng generate component component-name`

**IMPORTANTE !!** no agreguen la palabra Component al final del nombre del component, ya que les va a quedar HelloWorldComponentComponent.

Opciones disponibles: https://angular.io/cli/generate#component

#### Files de un component

Cuando se genera un component mediante CLI, se obtiene como resultado una carpeta con el nombre del component, la cual contiene 4 archivos: html|ts|spec|scss.

* html: template del component.
* scss: style cuyo scope es a nivel del componente generado, o sea solo se va a aplicar al presente component.
* spec: jasmine tests para el presente component.
* ts: aca van a encontrar una clase cuyo decorator @Component tiene como metadata:
	- selector: tag que se va a utilizar para añadir este component en un component padre.
  - templateUrl: url del html del component
  - styleUrls: url del style del component
	En esta clase, van a escribir el menor codigo posible. Solo lo necesario para poder mostrar en el template o obtener del mismo la data utilizada por el componente.

## Componentes 'singletons': header and footer

Los componentes header y footer, si bien van a estar visibles a lo largo de toda o casi toda la aplicacion. Siempre se va a estar utilizando la misma instancia de los mismos.
Por tal motivo, estos componentes se guardan en el modulo Core.

Para generar los mismos creamos una carpeta components dentro de Core y en la misma ejecutamos:

```
ng generate component header
ng generate component footer
```

Estos comandos, ademas de crear los componentes, los va a agregar en los declarations del CoreModule.
Ademas, para que esten disponibles para ser incorporados al template del AppComponent, debemos agregarlos al export del CoreModule.

#### Utilizando los components
Para agregar uno de nuestro components en un template, se utiliza el selector presente en el ts file del component. Por ejemplo, para el caso del header:

`<app-header></app-header>`

## Smart and Dumb Components:

Existe otra clasificacion (la mas importante) para los components: smart y dumbs. Tener es cuenta que una aplicacion deberia tener muchos dumbs components y la menor cantidad posible de smart components.
https://medium.com/@jtomaszewski/how-to-write-good-composable-and-pure-components-in-angular-2-1756945c0f5b

Los dumb components funcionan como Pure Functions: reciben un input, el cual 'utilizan' pero no modifican y en algunas ocaciones pueden generar un output.

Los smart components, son los padres de un conjunto de dumb components. Son los que se encargan de obtener y procesar la data que se convertira en los input de los dumbs; y de capturar los outputs de los mismos para realizar nuevas acciones. 

#### Creacion de modelo de datos y sus mocks

1. Crear models y mocks folders en CoreModule.
2. Crear interfaz para contacts.
3. Crear index.ts en models folder y exportar el contact.model, esto permite exportar todos los modelos de datos de forma mas simple.
4. Crear mock para contacts.
5. Crear index.ts en mocks folder y exportar el contact.mock.

#### Creacion del smart component y sus dumb components

1. En el feature module (ContactsModule), crear component ContactsList (smart).
2. Crear ContactsCard (dumb).
3. Importar 'provisoriamente' el feature module en AppModule (esto se va a cambiar cuando implementemos el routing).
4. Exportar 'provisoriamente' ContactsList (esto se va a cambiar cuando implementemos el routing). 
5. Agregar app-component-list en el template de AppComponent (esto se va a cambiar cuando implementemos el routing). 
6. Agregar dumb en componente padre y enviar datos mediante input.

#### Tipos de Data Binding

- Interpolation: {}
- PropertyBinding: [] (input).
- EventBinding: () (output).
- 2-way DataBinding: [()] (ngModel).


# Services

Los services son aquellos archivos donde se escribe la mayor parte de la logica de la aplicacion. Sobre todo, aquello que se necesita que esté disponible desde varios componentes u otros services.
Por lo general, los services son singletons y se crean dentro del modulo CoreModule.
Al momento de crearlos mediante Angular CLI, se agrega cierta metadata en el decorator del service
```
@Injectable({
  providedIn: 'root'
})
```
Esta metadata indica que el servicio va a estar disponible a lo largo de toda la aplicacion y en forma de singleton.
Cuando un service contiene esta metadata, no es necesario vover a agregarlo en la metadata del CoreModule.

Los dos usos principales que vamos a darles a los services son: 
- llamadas al backend;
- procesar y compartir data entre distintos componentes y services (store).
Si bien todos ellos son services, a modo organizativo, en nuestros proyectos los clasificamos en Services (los que contienen unicamente las llamadas al BE) y utils (los que contienen toda la demas logica).

#### Creando nuestro primer util y service

1. Dentro de core creamos dos carpetas: utils y services.
2. Crear ContactUtil y ContactService:

Para generar los utils/services se utiliza el comando: 
`ng generate service contact --flat`

https://angular.io/cli/generate#service

Como los utils son una convencion nuestra, no existe un ng generate util... pero al ser practicamente services, los generamos con el ng generate service. Y luego renombramos el archivo y todas las referencias al mismo.

3. Injectar el util en el constructor del smart component.
4. Injectar el service en el constructor del util.

#### Observables y BehaviorSubject
Como se comento anteriormente, los utils -ademas de contener toda la logica- funcionan como una especie de 'store' o 'data source'.
Los mismos mantienen un unico 'source of true' al cual se van a subscribir todos los componentes/services/utils que necesiten acceder a la data almacenada.
Esta subscripcion, ademas, les va a permitir mantener la instancia local (en el componente) de dicha informacion 'sincronizada' con lo almacenado en el util.

Para realizar todo esto, los utils se valen de los Observables y los BehaviorSubjects.

##### Observables
https://www.youtube.com/watch?v=Tux1nhBPl_w&t=737s