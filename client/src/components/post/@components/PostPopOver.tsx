import { Popover } from '@mui/material';
type PostPopOverProps = {
  handleClose: () => void;
  children: React.ReactNode;
  anchorEl: SVGSVGElement | null;
};

const PostPopOver = ({ children, anchorEl, handleClose }: PostPopOverProps): JSX.Element => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        sx={{
          marginTop: '7px',
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default PostPopOver;
