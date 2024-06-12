import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'daisyui/dist/full.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '../../style/TableComponent.css';
import 'primeicons/primeicons.css';
import search from "../../assets/SearchLogo.svg";
import filter from "../../assets/icons/filter.svg";
import plus from "../../assets/Plus.svg";
import Popup from '@components/Popups/Popup';

function TableComponent({
  data,
  header,
  columns,
  ColorConfig,
  admin = false,
  rows = 10,
  paginator = true,
  depends = 'status',
  onDetailsClick,
  onEditClick,
  onDelete,
  showSearch = true,
  showFilter = true
}) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRowForDeletion, setSelectedRowForDeletion] = useState(null);
  const popupRef = useRef(null);

  const renderHeader = () => {
    return (
      <div className="flex flex-row justify-between m-0 items-center">
        <h3>{header}</h3>
        <div className="table-header-actions flex flex-row gap-4 items-center justify-center">
          {showSearch && (
            <label className="input input-bordered flex items-center gap-2 input-md">
              <img src={search} className="w-4 h-4" alt="search" />
              <input type="search" className="grow" placeholder="Search" onChange={(e) => setGlobalFilter(e.target.value)} value={globalFilter} />
            </label>
          )}
          {showFilter && (
            <button className='btn' style={{ background: "#94C3B3" }}>
              <img src={filter} alt="filter" />
            </button>
          )}
          {admin && (
            <button className='btn' style={{ background: "#94C3B3" }}>
              <img src={plus} alt="add" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleDeleteClick = (rowData) => {
    setSelectedRowForDeletion(rowData);
    if (popupRef.current) {
      popupRef.current.showModal();
    }
  };

  const handleConfirmDelete = () => {
    if (selectedRowForDeletion) {
      onDelete(selectedRowForDeletion.id);
      setSelectedRowForDeletion(null);
    }
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  const handleCancelDelete = () => {
    setSelectedRowForDeletion(null);
    if (popupRef.current) {
      popupRef.current.close();
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="relative">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-0"><Button icon="pi pi-ellipsis-h" className="p-button-warning" /></div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50 absolute">
            <li tabIndex={2}><a onClick={() => onDetailsClick(rowData)}>Details</a></li>
            {admin ? <>
              <li tabIndex={3}><a onClick={() => onEditClick(rowData)}>Edit</a></li>
              <li tabIndex={4}><a onClick={() => handleDeleteClick(rowData)}>Remove</a></li>
            </> : null}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <DataTable
        value={data}
        paginator={paginator}
        rows={paginator ? rows : undefined}
        tableStyle={{ minWidth: '65rem' }}
        globalFilter={globalFilter}
        header={renderHeader()}
        size="large"
      >
        {columns.map((column, i) => (
          <Column key={i} field={column.field} header={column.header} sortable body={column.field === depends ? ColorConfig : null} />
        ))}
        <Column key="action" header="Action" body={actionTemplate} />
      </DataTable>

      <Popup
        ref={popupRef}
        warning={true}
        leavesid="delete-confirm-popup"
        description="Are you sure you want to delete this item?"
        confirm={true}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default TableComponent;