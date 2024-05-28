import { FC } from "react";

const NodeLinkLine: FC = () => {
  return (
    <>
      <tr>
        <td colSpan={4}>
          <div className="mx-auto my-0 w-px h-12 bg-black" />
        </td>
      </tr>
      <tr>
        <td className="text-center align-top py-0 px-3 rounded-none border-r border-black">
          &nbsp;
        </td>
        <td className="text-center align-top py-0 px-3 rounded-none border-t border-black">
          &nbsp;
        </td>
        <td className="text-center align-top py-0 px-3 rounded-none border-r border-t border-black">
          &nbsp;
        </td>
        <td className="text-center align-top py-0 px-3 rounded-none">&nbsp;</td>
      </tr>
    </>
  );
};

export default NodeLinkLine;
