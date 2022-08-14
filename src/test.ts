import {diff_match_patch as DMP} from "diff-match-patch"
import type {Diff} from 'diff-match-patch';


// 定义接口
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
type Patch = InsertPatch | RemovalPatch;
type insertType = "inserts";
type removalType = "removal";
// 定义常量
const insertTypeValue = "inserts";
const removalTypeValue = "removal";
// // 临时常量
// const input: string = `interface RemovalPatch {
//     type: 'removal'
//     from: number
//     length: number
// }`
// const output: string = `interface InsertPatch {}`


function calculatePatch(diff: Diff[]): Patch[] {
    const patches: Patch[] = [];
    let index = 0;
    for (let change of diff) {
        switch (change[0]) {
            case 0 :
                index += change[1].length;
                break;
            case -1:
                patches.push({
                    type: removalTypeValue,
                    from: index,
                    length: change[1].length
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

function applyPatches(input: string, patches: Patch[]) {
    let text: Array<String> = input.split('');
    for (let patch of patches) {
        if (patch.type === insertTypeValue) {
            text.splice(patch.from, 0, ...patch.text.split(''))
        } else if (patch.type === removalTypeValue) {
            text.splice(patch.from, patch.length)
        }
    }
    return text.join('');
}


function diffFun(input: string, output: string): Diff[] {
    const diff = new DMP();
    const diffResult = diff.diff_main(input, output);
    diff.diff_cleanupSemantic(diffResult)
    return diffResult
}

export default function (input: string, output: string) {
    const delta = diffFun(input, output);
    const patches = calculatePatch(delta);
    const patchesValue = applyPatches(input, patches)
    return patchesValue
}
