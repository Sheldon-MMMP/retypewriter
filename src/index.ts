import {diff_match_patch as DMP} from "diff-match-patch"
import type {Diff} from 'diff-match-patch';
import * as Path from "path";

interface InsertPatch {
    type: insertType
    from: number
    text: string
}

interface RemovalPatch {
    type: removalType
    from: number
    length: number
}

// 定义类型
export type Patch = InsertPatch | RemovalPatch;
export type insertType = "inserts";
export type removalType = "removal";
// 定义常量
export const insertTypeValue = "inserts";
export const removalTypeValue = "removal";


export function calculatePatch(diff: Diff[]): Patch[] {
    const patches: Patch[] = [];
    let index = 0;
    for (let change of diff) {
        switch (change[0]) {
            case 0 :
                index += change[1].length;
                break;
            case -1:
                const length = change[1].length
                patches.push({
                    type: removalTypeValue,
                    from: index + length,
                    length,
                })
                break;
            case 1:
                patches.push({
                    type: insertTypeValue,
                    from: index,
                    text: change[1],
                })
                index += change[1].length;
                break;
            default:
                throw new Error("unknown change type")
        }
    }
    return patches
}

export function applyPatches(input: string, patches: Patch[]) {
    let text = input
    for (let patch of patches) {
        if (patch.type === insertTypeValue) {
            text = text.slice(0, patch.from) + patch.text + text.slice(patch.from)
        } else if (patch.type === removalTypeValue) {
            text = text.slice(0, patch.from - patch.length) + text.slice(patch.from)
        }
    }
    return text;
}


export function diffFun(input: string, output: string): Diff[] {
    const diff = new DMP();
    const diffResult = diff.diff_main(input, output);
    diff.diff_cleanupSemantic(diffResult)
    return diffResult
}

// export default function (input: string, output: string) {
//     const delta = diffFun(input, output);
//     console.log({delta});
//     const patches = calculatePatch(delta);
//     console.log({patches})
//     const patchesValue = applyPatches(input, patches)
//     console.log(patchesValue)
//     return patchesValue
// }

