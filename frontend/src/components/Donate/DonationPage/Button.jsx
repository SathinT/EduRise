import React from 'react'
export const Button = ({
                           children,
                           variant = 'primary',
                           className = '',
                           onClick,
                           ...props
                       }) => {
    const baseStyles =
        'px-4 py-2 rounded-md font-medium text-sm transition-colors'
    const variantStyles = {
        primary: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600',
        outline:
            'bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10',
    }
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
