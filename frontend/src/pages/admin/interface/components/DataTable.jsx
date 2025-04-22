import React from 'react';

export function DataTable({ title, columns, data }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b bg-gray-100">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="py-3 px-4 text-left text-sm font-semibold text-gray-600"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="py-3 px-4 text-sm text-gray-700">
                                    {column.render
                                        ? column.render(row)
                                        : row[column.accessor]}
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
