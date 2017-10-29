// export {Facets};

/**
* For passing simple target state in and out of a {Facets}.
*/
export type SimpleState=string|boolean|number
/**
Marker interface for Facets implementation of Superficial target.
*/
export interface Target{}
export interface Times {
  setResetWait(wait: number): void;
  elapsed(): number;
}
export interface TargetCoupler {
  /**
   * Called on update of the target constructed with the coupler.
   * @param {string} title identifies the target
   * @param state the updated state
   */
  targetStateUpdated?: (title: string, update: SimpleState) => void;
}
/**
Connects a textual target with client code.
*/
export interface TextualCoupler extends TargetCoupler{
  /**
  Sets initial state of the textual.
  */
  passText?:string;
  /**
  * Supply state for the target.
  * Must be implemented if no passText.
  * @param {string} title identifies the target
  * @returns {string} the state
  */
  getText?:(title:string)=>string;
  /**
  * Allows validation of changed target state
  * @param {string} title identifies the target
  * @param {string} text to validate
  * @returns {boolean} true if valid
  */
  isValidText?:(title:string,text:string)=>boolean;
}
/**
 Connects a toggling (boolean) target with client code.
 */
export interface TogglingCoupler extends TargetCoupler {
  /**
   Sets initial state of the toggling.
   */
  passSet: boolean;
}
/**
 Connects a numeric target with client code.
 */
export interface NumericCoupler extends TargetCoupler {
  /**
   Sets initial state of the numeric.
   */
  passValue: number;
  /**
   Minimum state of the numeric.
   */
  min: number;
  /**
   Maximum state of the numeric.
   */
  max: number;
}
/**
 Connects an indexing (list-type) target with client code.
 */
export interface IndexingCoupler extends TargetCoupler{
  /**
   Sets initial state of the indexing (the index into its contents).
   */
  passIndex:number;
  /**
   * Get the contents to be indexed
   * @param {string} title identifies the target
   * @returns {any[]}
   */
  getIndexables: (title: string) => any[];
  /**
   * Get strings to represent the indexable contents in the UI
   * @param {string} title identifies the target
   * @returns {string[]}
   */
  getUiSelectables: (title: string) => string[];
}
/**
 * Current values exposed by the indexing
 */
interface IndexingState {
  /**
   * As last created by IndexingCoupler.getUiSelectables
   */
  uiSelectables: string[];
  /**
   * The result of the current index into the indexables.
   */
  indexed: any;
}
/**
 * Defines a target that wraps content selected with an indexing.
 */
export interface IndexingFramePolicy {
  /**
   * Title for the wrapping target.
   */
  title: string;
  /**
   * Array of items to be indexed.
   */
  content: any[];
  /**
   * Title for the wrapped indexing.
   */
  indexingTitle: string;
  /**
   * Supply strings to expose the content in the UI.
   * Analogue of IndexingCoupler function. 
   * @param {any[]} content current state of content
   * @returns {string[]}
   */
  getUiSelectables: () => string[];
  /**
   * Provides for supplying different targets
   * @param indexed selected with the indexing
   */
  newIndexedTitle: (indexed: any) => string;
  /**
   * Create Targets exposing the indexed content
   * @param indexed selected with the indexing
   * @param title from {newIndexedTitle}
   * @returns {Target[]}
   */
  newIndexedTargets: (indexed: any, title: string) => Target[];
/**
   * Create Targets exposing content independent of the indexing state
   * @returns {Target[]}
   */
  newIndexingTargets: () => Target[];
}
/**
* Constructs a new Superficial application core.
* @param {boolean} trace
* @returns {Facets}
*/
export function newInstance(trace:boolean):Facets;
/**
* A Superficial application core.
*/
export interface Facets{
  times: Times;
  doTrace: boolean;
  identity():any;
  /**
   *
   * @param {string} title identifies the target or its targeter
   * @param {TextualCoupler} coupler connects the target to client code
   * @returns textual {Target}
   */
  newTextualTarget(title:string,coupler:TextualCoupler):Target;
  newTogglingTarget(title: string, c: TogglingCoupler): Target;
  newNumericTarget(title: string, coupler: NumericCoupler): Target;
  newTriggerTarget(title: string, coupler: TargetCoupler): Target;
  /**
  * Constructs a target containing others
  * @param {string} title for the target
  * @param {Target} members of the group
  * @returns group of {Target}s
  */
  newTargetGroup(title:string,...members:Target[]):Target;
  newIndexingTarget(title:string,coupler:IndexingCoupler):Target;
  getIndexingState(title: string): IndexingState;
  buildSelectingFrame(policy: IndexingFramePolicy): Target;
  /**
   * Constructs a tree of targeters using the initial target tree.
   * @param {Target} targetTree the root of the target tree
   */
  buildTargeterTree(targetTree:Target):void;
  /**
   * Attach an internal facet to the targeter with the target title passed.
   * @param {string} title identifies the targeter
   * @param {(state) => void} facetUpdated callback to update the UI with the target state
   */
  attachFacet(title:string,facetUpdated:(state:SimpleState)=>void):void;
  /**
   * Update the state of the target identified.
   * @param {string} title identifies the target
   * @param {SimpleState} update to update the target
   */
  updateTargetState(title:string,update:SimpleState):void;
  /**
   * Obtain the the state of the target identified.
   * @param {string} title identifies the target
   * @returns {SimpleState} the state
   */
  getTargetState(title:string):SimpleState;
  /**
   * Notify the framework of an update and trigger a retargeting. 
   * @param {string} title identifies the target
   */
  notifyTargetUpdated(title: string): void;
  setTargetLive(title: string, live: boolean): void;
  isTargetLive(title: string): boolean;
  onRetargeted: ()=>void;
  supplement:any;
}
