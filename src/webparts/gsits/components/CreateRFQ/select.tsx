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
  mergeStyleSets,
  TextField
} from '@fluentui/react';

const classes = mergeStyleSets({
  areaBox: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  uploadArea: {
    flexGrow: 1,
    border: '2px dashed #0078d4',
    padding: '10px 0',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f3f9fc',
  },
  fileList: {
    marginTop: '10px',
    position: 'relative',
    height: '175px',
    overflow: 'hidden',
    overflowY: 'auto',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e1dfdd',
    padding: '5px 10px',
    alignItems: 'center',
    height: '35px',
    boxSizing: 'border-box'
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
  { name: 'Martin Ma33', email: 'martin.ma@nelsongp.com22', role: 'engineering manager', department: 'Quality' },
];

const SupplierSelection: React.FC = () => {
  const [contacts, setContacts] = React.useState<(null | { name: string; email: string })[]>(Array(5).fill(null));
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = React.useState<Set<string>>(new Set());
  const [unSelectedSuppliers, setUn] = React.useState<any[]>([...supplierData]);
  const [modalOpen, setOpen] = React.useState<boolean>(false)
  const [createState, setState] = React.useState<any>({})


  const [hideDialog, setHideDialog] = React.useState(true);
  const [dialogProps, setTip] = React.useState({
    type: DialogType.normal,
    title: '提示',
    subText: 'tip'
  })

  const toggleHideDialog = () :void=> {
    setHideDialog(!hideDialog);
  };
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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const checkFive= () => {
    const num = contacts.filter(val => !!val?.email)
    if(num.length === 5) {
      setTip({
        ...dialogProps,
        subText: 'Up To 5'
      })
      setHideDialog(false)
      return true
    }
  }
  const handleSelect = (): void => {
    if(checkFive()) return
    const selectedContacts = supplierData.filter(supplier => selectedSuppliers.has(supplier.email))
    if(selectedContacts.length > 5) {
      setTip({
        ...dialogProps,
        subText: 'Up To 5'
      })
      setHideDialog(false)
      return
    }
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

  const handleOpenCreate = ():void => {
    if(checkFive()) return
    setOpen(true)
  }
  const closeDialog = ():void => {
    setOpen(false)
  }
  const handleAdd = ():void => {
    // 将新联系人添加到 contacts 状态
    setContacts((prevContacts) => {
      const newContacts = [...prevContacts];
      for (let i = 0; i < newContacts.length; i++) {
        if (newContacts[i] === null) {
          newContacts[i] = {
            name: createState.name,
            email: createState.email,
          };
          break;
        }
      }
      return newContacts;
    });
    closeDialog();  // 添加完成后关闭对话框
  };


  return (
      <Stack>
        <span className={classes.title}>Supplier Contact *</span>
        <div className={classes.areaBox}>
          <div className={classes.uploadArea} onClick={handleAddContacts}>
            <span style={{ fontWeight: 'bold' }}>+ Click to Select</span>
            <span> (up to 5)</span>
          </div>
          <div className={classes.uploadArea} onClick={handleOpenCreate}>
            <span style={{ fontWeight: 'bold' }}>+ Click to Create New</span>
          </div>
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
          <Stack style={{marginBottom: 10}}>
            <TextField placeholder="Search for a name or create a new one" onChange={(val:any) => {
              if(val.target.value) {
                setUn(supplierData.filter(item => item.name?.toLowerCase().includes(val.target.value.toLowerCase())))
              } else {
                setUn(supplierData)
              }
            }} style={{width: '100%' }}/>
          </Stack>
          <DetailsList
              items={unSelectedSuppliers}
              columns={columns}
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={0} // Disable selection mode on DetailsList
              onRenderDetailsHeader={() => null}
          />
          <span>Note: Newly created contacts are temporary and will disappear when New Parts RFQ Creation is created or cancelled. Only name and email are needed for a new contact</span>
          <DialogFooter>
            <PrimaryButton onClick={handleSelect} text="Select" />
            <DefaultButton onClick={() => setIsOpen(false)} text="Cancel" />
          </DialogFooter>
        </Dialog>

        <Dialog
            hidden={!modalOpen}
            onDismiss={closeDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'Create New Contact',
            }}
            maxWidth={500}
        >
          <Stack horizontal wrap tokens={{ childrenGap: 10 }}>
            <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
              <TextField
                  label="Name"
                  required
                  value={createState.name}
                  onChange={(e, newValue) => setState({...createState, name: newValue})}
              />
            </Stack.Item>
            <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
              <TextField
                  label="Email"
                  required
                  value={createState.email}
                  onChange={(e, newValue) => setState({...createState, email: newValue})}
              />
            </Stack.Item>
            <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
              <TextField
                  label="Title"
                  value={createState.title}
                  onChange={(e, newValue) => setState({...createState, title: newValue})}
              />
            </Stack.Item>
            <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
              <TextField
                  label="Function"
                  value={createState.functionField}
                  onChange={(e, newValue) => setState({...createState, functionField: newValue})}
              />
            </Stack.Item>
          </Stack>
          <p>Note: Newly created contacts are temporary and will disappear when New Parts RFQ Creation is created or cancelled.</p>
          <DialogFooter>
            <PrimaryButton onClick={handleAdd} text="Add" />
            <DefaultButton onClick={closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>

        <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogProps}
            modalProps={{
              isBlocking: false,
              styles: { main: { maxWidth: 450 } },
            }}
        >
          <DialogFooter>
            <PrimaryButton onClick={toggleHideDialog} text="确认" />
            <DefaultButton onClick={toggleHideDialog} text="取消" />
          </DialogFooter>
        </Dialog>
      </Stack>
  );
};

export default SupplierSelection;
