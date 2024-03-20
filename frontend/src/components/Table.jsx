import * as React from 'react';
import { TasksContext } from '../contexts/TasksContext'

export default function DataTable() {
  return (
    <div className="overflow-x-auto">
    <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Task Name</th>
        <th>Due Date</th>
        <th>Category</th>
        <th>SubLabel</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr class="bg-base-200">
        <th>
          <label>
            <input checked type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">Main Task</div>
            </div>
          </div>
        </td>
        <td>July 26, 2003</td>
        <td>Homework</td>
        <td>CSARCH1</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 2 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">Make Outline</div>
              <div className="text-sm opacity-50">Sub Task</div>
            </div>
          </div>
        </td>
        <td>July 26, 2003</td>
        <td>Homework</td>
        <td>CSARCH1</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
    {/* foot */}
    
  </table>
</div>
  );
}
