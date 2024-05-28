import type { FC } from "react";

import PolicyholderCard from "#/modules/Policyholder/PolicyholderCard";
import NodeLinkLine from "#/modules/Policyholder/PolicyholderTree/NodeLinkLine.tsx";
import type { RootPolicyholder } from "#/types/Policyholder";

interface PolicyholderTreeProps {
  data: RootPolicyholder;
  onClickTopNode: (code: string) => void;
}

const PolicyholderTree: FC<PolicyholderTreeProps> = (props) => {
  const {
    data: { l, r, ...policyholder },
    onClickTopNode,
  } = props;

  const treeNodes = (() => {
    const result = [policyholder];
    let left = 0;
    let right = 0;

    while (left < l.length || right < r.length) {
      if (left < l.length) {
        result.push(l[left++]);
      }
      if (right < r.length) {
        result.push(r[right++]);
      }
    }
    return result;
  })();

  const renderNodes = (idx: number) => {
    if (idx >= treeNodes.length) {
      return null;
    }
    const node = treeNodes[idx];
    const left = idx * 2 + 1;
    const right = idx * 2 + 2;

    return (
      <table>
        <tbody>
          <tr>
            <td colSpan={4}>
              <div className="w-fit mx-auto flex">
                <PolicyholderCard
                  {...node}
                  root={idx === 0}
                  introducerIsRoot={node.introducer_code === policyholder.code}
                />
                {idx === 0 && (
                  <button
                    className="text-blue-400 hover:text-blue-600"
                    onClick={() => {
                      onClickTopNode(policyholder.code);
                    }}
                  >
                    Top Level
                  </button>
                )}
              </div>
            </td>
          </tr>
          {(left < treeNodes.length || right < treeNodes.length) && (
            <NodeLinkLine />
          )}
          <tr>
            <td className="align-top" colSpan={2}>
              {renderNodes(left)}
            </td>
            <td className="align-top" colSpan={2}>
              {renderNodes(right)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return renderNodes(0);
};

export default PolicyholderTree;
