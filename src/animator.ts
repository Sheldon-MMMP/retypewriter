import type { Patch } from "./index"
import {insertTypeValue, removalTypeValue} from "./index"

export default function* createAnimator(input: string, patches: Patch[]) {
  let output = input
  let cursor = 0;
  for (let patch of patches) {
    if (patch.type === insertTypeValue) {
      cursor = patch.from;
      const head = output.slice(0, patch.from);
      const tail = output.slice(patch.from);
      let selection = '';
      for (let char of patch.text) {
        selection += char
        yield {
          cursor:cursor+selection.length,
          output: head + selection + tail
        }
      }
      output = head + patch.text + tail;
    } else if (patch.type === removalTypeValue) {
      cursor = patch.from;
       const head = output.slice(0, patch.from - patch.length);
       const tail= output.slice(patch.from);
       let selection = output.slice(patch.from - patch.length,patch.from);
       for (let i=selection.length; i>=0;i--){
        yield{
          cursor:cursor-i,
          output:head +selection +tail
        }
       } 
      output = head + tail
    }
  }
}
