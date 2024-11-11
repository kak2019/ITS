/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  Checkbox,
  Stack,
  IconButton,
  mergeStyleSets
} from '@fluentui/react';

const classes = mergeStyleSets({
  uploadArea: {
    border: '2px dashed #0078d4',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f3f9fc',
  },
  fileList: {
    marginTop: '10px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e1dfdd',
    padding: '5px 10px',
    alignItems: 'center',
    height: '30px'
  },
  oddItem: {
    backgroundColor: '#fff',
  },
  evenItem: {
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontWeight: 'bold'
  }
});

const supplierData = [
  { name: 'Feng Chen', email: 'feng.chen@nelsongp.com', role: 'import & export', department: 'Logistics' },
  { name: 'Martin Ma', email: 'martin.ma@nelsongp.com', role: 'engineering manager', department: 'Quality' },
  { name: 'Frank Liu', email: 'frank.liu@nelsongp.com', role: 'assistant quality manager', department: 'Quality' },
  { name: 'John Doe', email: 'john.doe@nelsongp.com', role: 'quality analyst', department: 'Quality' },
  { name: 'Jane Smith', email: 'jane.smith@nelsongp.com', role: 'procurement specialist', department: 'Procurement' },
];

const SupplierSelection: React.FC = () => {
  const [contacts, setContacts] = React.useState<(null | { name: string; email: string })[]>(Array(5).fill(null));
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = React.useState<Set<string>>(new Set());

  const toggleSupplierSelection = (email: string): void => {
    setSelectedSuppliers((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(email)) {
        newSelection.delete(email);
      } else {
        newSelection.add(email);
      }
      return newSelection;
    });
  };

  const handleSelect = (): void => {
    const selectedContacts = supplierData.filter(supplier => selectedSuppliers.has(supplier.email)).slice(0, 5);
    setContacts((prevContacts) => {
      const newContacts = [...prevContacts];
      selectedContacts.forEach((contact, index) => {
        if (index < newContacts.length) {
          newContacts[index] = { name: contact.name, email: contact.email };
        }
      });
      return newContacts;
    });
    setIsOpen(false);
  };

  const handleRemoveContact = (index: number): void => {
    setContacts((prevContacts) => {
      const newContacts = [...prevContacts];
      newContacts[index] = null;
      return newContacts;
    });
  };

  const columns = [
    {
      key: 'column1',
      name: '',
      fieldName: 'select',
      minWidth: 50,
      maxWidth: 50,
      onRender: (item: any) => (
        <Checkbox
          checked={selectedSuppliers.has(item.email)}
          onChange={() => toggleSupplierSelection(item.email)}
        />
      ),
    },
    { key: 'column2', name: 'Name', fieldName: 'name', minWidth: 100 },
    { key: 'column3', name: 'Email', fieldName: 'email', minWidth: 150 },
    { key: 'column4', name: 'Role', fieldName: 'role', minWidth: 150 },
    { key: 'column5', name: 'Department', fieldName: 'department', minWidth: 150 },
  ];

  const handleAddContacts = (): void => {
    setIsOpen(true);
  };

  return (
    <Stack>
      <span className={classes.title}>Supplier Contact *</span>
      <div className={classes.uploadArea} onClick={handleAddContacts}>
        <span style={{ fontWeight: 'bold' }}>+ Click to Select</span>
        <span> (up to 5)</span>
      </div>
      <Stack className={classes.fileList}>
        {contacts.map((contact, index) => (
          <div key={index} className={`${classes.fileItem} ${index % 2 === 0 ? classes.evenItem : classes.oddItem}`}>
            {contact ? (
              <>
                <span>{contact.name} - {contact.email}</span>
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  onClick={() => handleRemoveContact(index)}
                />
              </>
            ) : (
              <span />
            )}
          </div>
        ))}
      </Stack>

      <Dialog
        hidden={!isOpen}
        onDismiss={() => setIsOpen(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Supplier Selection',
        }}
        maxWidth={800}
      >
        <DetailsList
          items={supplierData}
          columns={columns}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={0} // Disable selection mode on DetailsList
          onRenderDetailsHeader={() => null}
        />
        <DialogFooter>
          <PrimaryButton onClick={handleSelect} text="Select" />
          <DefaultButton onClick={() => setIsOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default SupplierSelection;
