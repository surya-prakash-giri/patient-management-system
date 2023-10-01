import React from "react";

export const RowCreator = (props) => {
  const eachEntry = props.item;
  return (
    <>
        <div>
            <table align="center">
            <tr>
                <td>
                <b>{eachEntry.componentName}</b>
                </td>
            </tr>
            <tr>
                <td>{eachEntry.componentName}</td>
                <td>{eachEntry.componentValue}</td>
                <td>{eachEntry.measuredDateTime}</td>
            </tr>
            </table>
        </div>
    </>
  );
};
