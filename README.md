[projectUri]: https://bitbucketsson.betsson.local/projects/WF/repos/obg.ng2.sdk-sample/browse
[projectGit]: https://bitbucketsson.betsson.local/scm/wf/obg.ng2.sdk-sample.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: https://wikisson.betsson.local/display/SG/Contribution+Guidelines
[releaseWorkflowWiki]: https://wikisson.betsson.local/display/SG/Prepare+new+Release+for+Library
[setupMachineWiki]: https://wikisson.betsson.local/display/SG/Setup+Machine+for+Development+-+Libraries

# obg.ng2.sdk-sample
SDK Sample using Angular2 with Redux, consuming globals and best practices


**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Getting Started

## Installation

```
npm install @obg/ng2.sdk-sample --save
typings install npm:@obg/ng2.sdk-sample -save
```

# Usage

## Register providers

```ts
import { provideStore } from "@ngrx/store";
import { runEffects } from "@ngrx/effects";
import { SDK_SAMPLE_PROVIDERS, SDK_SAMPLE_EFFECTS, SDK_SAMPLE_REDUCERS } from "@obg/ng2.sdk-sample";

// within bootstrap or AppComponent
providers: [
	SDK_SAMPLE_PROVIDERS,
	runEffects(SDK_SAMPLE_EFFECTS),
	provideStore(SDK_SAMPLE_REDUCERS),
]
```

```ts
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { Hero, HeroActions, HeroSelectors } from "@obg/ng2.sdk-sample";

heroes$: Observable<Hero[]>;

@Injectable()
constructor(
	private store: Store<AppState>,
	private heroSelectors: HeroSelectors,
	private heroActions: HeroActions
) {
}

ngOnInit() {
	this.store.dispatch(this.heroActions.loadAll());
	this.heroes$ = this.store.select(this.heroSelectors.getAllSelector());
}

```

# Contributing to the project
In order to contribute please read the [Contribution guidelines][contribWiki].

## Setup Machine for Development
Install/setup the machine by following [Setup Machine for Development - Libraries WIKI][setupMachineWiki].

## Setup Project to Develop

### Cloning Repo

- Open SourceTree
- Clone project repo from [project git][projectGit]
- Switch to `develop` branch


## Project Setup
The following process need to be executed in order to get started.

```
npm install
```


## Building the code

```
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

## Running the tests

```
gulp test
```


## Development utils

### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```


## Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch) --version-suffix beta (default: rc - only applies to prerelease)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and distributing it.