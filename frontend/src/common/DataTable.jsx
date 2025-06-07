import React from 'react';
import PropTypes from 'prop-types';

export function DataTable({ title, columns, data }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="py-3 px-4 text-left text-sm font-medium text-gray-500"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="py-3 px-4 text-sm">
                                    {row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

DataTable.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
