import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

// import { Shake } from 'components/animations';

import CreditCard from 'components/CreditCard';

const BigContainer = styled.form`
  height: calc(100% - 100px);
  border-radius: 50px 50px 0 0;
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Submit = styled.button`
  border-radius: 40px;
  background: #448AFF;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
  outline: none;
  border: 0;
  padding: 16px 32px;
`;

const Details = () => {
  const history = useHistory();
  const { time, name } = useParams();

  const submit = () => {
    const newUrl = `/confirmation/${time}/${name}`;
    console.log(newUrl);
    history.push(newUrl);
  };

  return (
    <BigContainer autoComplete="off">
      <CreditCard />
      {/* </Group> */}
      <Submit className="card" onClick={submit} type="button">Insert Details</Submit>
      {/* </form> */}
    </BigContainer>
  );
};

export default Details;
