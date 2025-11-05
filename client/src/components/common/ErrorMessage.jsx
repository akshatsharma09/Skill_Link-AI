import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({
  title = 'Error',
  message,
  onRetry,
  className = '',
  showIcon = true
}) => {
  return (
    <div className={`rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
        )}
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {title}
          </h3>
          {message && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{message}</p>
            </div>
          )}
          {onRetry && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-md bg-red-50 dark:bg-red-900/20 px-2 py-1.5 text-sm font-medium text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
