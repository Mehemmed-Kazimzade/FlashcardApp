import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCallback } from 'react';
import ReusableDialog from './ReusableDialog';
import deleteDeckFromLocalStorage from '../utils/deleteDeckFromLocalStorage';
import { useNavigate } from 'react-router';

const options = [
    'Export to CSV',
    'Delete',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ id, deck }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [dialogProps, setDialogProps] = React.useState({});
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    
    const deleteFunc = useCallback(() => {
        deleteDeckFromLocalStorage(id);
        navigate("/decks/", {state: {status:"SUCCESS", message: "Deck Deleted Succesfully." }});
    }, [id]);

    const exportToCSV = useCallback(() => {
        
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);

        
        if (option === 'Delete') {
            setDialogProps({
                title: "Are you sure you want to delete this deck permanently?",
                btn1Content: "Cancel",
                btn2Content: "Yes, delete",
                callbackFunc: deleteFunc,
                content: "",
            });

            setOpenModal(true);
        }

        if (option === "Export to CSV") {
            console.log(deck);
            // setDialogProps({
            //     title: "Are you sure you want to download this deck as a csv file",
            //     btn1Content: "Cancel",
            //     btn2Content: "Download",
            //     callbackFunc: deleteFunc,
            //     content: "Once you click download, your installment will start.",
            // });

            // setOpenModal(true);
        }
    };

    return (
    <div>
        <ReusableDialog dialogProps={dialogProps} openModal={openModal} setOpenModal={setOpenModal} />
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}>
        <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ display:"inline-block" }}
            slotProps={{
            paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
            },
            },
            list: {
            'aria-labelledby': 'long-button',
            },
        }}
        >
        {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                {option}
            </MenuItem>
        ))}
        </Menu>
    </div>
    );
}