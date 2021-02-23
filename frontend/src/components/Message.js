import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Message = ({ variant, children, hasRefresh }) => {
  const history = useHistory();

  const handleRefresh = () => {
    history.go(0);
  };

  return (
    <Alert style={{ display: 'flex', alignItems: 'center' }} variant={variant}>
      {children}
      {hasRefresh && (
        <Button
          style={{ marginLeft: 'auto' }}
          variant='outline-light'
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      )}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
  hasRefresh: false,
};

export default Message;
