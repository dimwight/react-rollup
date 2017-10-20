import {traceThing} from './Bits';
/** Swaps an array element with one of its neighbours.
 * @param src the array
 * @param index of the element to be swapped
 * @param down the direction of the swap
 */
export function swapArrayElement(src: any[],index,down) {
  /*
    1. Define source indices of elements to be swapped.
    2. Define output indices to swap them to.
    3. Split the source array around the swap indices.
    4. Reassemble with the swapped elements.
    */

  //  Debug?
  traceThing('^swapArrayElement', { index: index, down: down,src:src });

  //  Guard against string!
  const indexNum=Number(index);

  // Define source and output indices
  const lowerSrc = down?indexNum:indexNum+1,
    upperSrc = down?indexNum-1:indexNum;
  const lowerDest = down ? indexNum-1 : indexNum,
    upperDest = down ? indexNum : indexNum+1;

  //  Check for out of bounds
  const names=['index','lowerSrc','upperSrc','lowerDest','upperDest'];
  [indexNum,lowerSrc,upperSrc,lowerDest,upperDest].forEach((n,at)=>{

    // Index out of bounds?
    if(n<0||n>=src.length)throw new Error(`Index out of range: ${names[at]}=${n}`);
  });

  //  Debug?
  traceThing('^swapArrayElement', { lowerSrc: lowerSrc, upperSrc: upperSrc,
    lowerDest: lowerDest, upperDest:upperDest });

  //  Define unaffected regions
  const top = src.slice(0, lowerDest), tail = src.slice(upperDest+1);

  // Assemble output
  const dest = top.concat(src[lowerSrc],src[upperSrc],tail);

  //  Debug?
  traceThing('^swapArrayElement~', false?{top:top,tail:tail}:{dest:dest});

  // Rebuild source
  src.splice(0,src.length,...dest);

  // Final check?
  traceThing('^swapArrayElement~~', {src:src});
}
