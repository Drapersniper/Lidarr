import PropTypes from 'prop-types';
import React from 'react';
import IconButton from 'Components/Link/IconButton';
import TableOptionsModalWrapper from 'Components/Table/TableOptions/TableOptionsModalWrapper';
import VirtualTableHeader from 'Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from 'Components/Table/VirtualTableHeaderCell';
import VirtualTableSelectAllHeaderCell from 'Components/Table/VirtualTableSelectAllHeaderCell';
import { icons } from 'Helpers/Props';
// import hasGrowableColumns from './hasGrowableColumns';
import styles from './UnmappedFilesTableHeader.css';

function UnmappedFilesTableHeader(props) {
  const {
    columns,
    onTableOptionChange,
    allSelected,
    allUnselected,
    onSelectAllChange,
    ...otherProps
  } = props;

  return (
    <VirtualTableHeader>
      {
        columns.map((column) => {
          const {
            name,
            label,
            isSortable,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'select') {
            return (
              <VirtualTableSelectAllHeaderCell
                key={name}
                allSelected={allSelected}
                allUnselected={allUnselected}
                onSelectAllChange={onSelectAllChange}
              />
            );
          }

          if (name === 'actions') {
            return (
              <VirtualTableHeaderCell
                key={name}
                className={styles[name]}
                name={name}
                isSortable={false}
                {...otherProps}
              >

                <TableOptionsModalWrapper
                  columns={columns}
                  onTableOptionChange={onTableOptionChange}
                >
                  <IconButton
                    name={icons.ADVANCED_SETTINGS}
                  />
                </TableOptionsModalWrapper>
              </VirtualTableHeaderCell>
            );
          }

          return (
            <VirtualTableHeaderCell
              key={name}
              className={styles[name]}
              name={name}
              isSortable={isSortable}
              {...otherProps}
            >
              {typeof label === 'function' ? label() : label}
            </VirtualTableHeaderCell>
          );
        })
      }
    </VirtualTableHeader>
  );
}

UnmappedFilesTableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func.isRequired,
  onTableOptionChange: PropTypes.func.isRequired
};

export default UnmappedFilesTableHeader;
