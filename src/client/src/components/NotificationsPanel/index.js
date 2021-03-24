import { useState, useEffect, useContext } from 'react';
import * as Styled from './styled';
import ProfilePhoto from '../ProfilePhoto';
import NotificationsButton from '../NotificationsButton/index';
import CloseButton from '../CloseButton/index';
import { UserContext } from '../../contexts/UserContextProvider';
import { useRequest } from '../../hooks/useRequest';
const NotificationsPanel = () => {
    const { user } = useContext(UserContext);
    const [showNotifications, setShowNotifications] = useState(false);
    const { requests, setRemoveId } = useRequest();
    const toggleNotificationsPanel = () => {
        setShowNotifications((previous) => !previous);
    };

    const hideNotificationsPanel = () => {
        setShowNotifications(false);
    };

    useEffect(() => {
        window.addEventListener('click', hideNotificationsPanel);
        return () => {
            window.removeEventListener('click', hideNotificationsPanel);
        };
    }, []);
    // Get Received Requests through the API and display them
    // Render 2 buttons for accept/deny
    return (
        <>
            <NotificationsButton
                active={showNotifications}
                onClick={toggleNotificationsPanel}
            />
            <Styled.Notifications active={showNotifications}>
                {requests?.length
                    ? requests.map((request) => {
                          if (request.toId === user.id) {
                              return (
                                  <Styled.Notification key={request.id}>
                                      <Styled.Group>
                                          <ProfilePhoto
                                              src="https://picsum.photos/100/100"
                                              size={50}
                                          />
                                      </Styled.Group>
                                      <Styled.Content>
                                          <Styled.Group>
                                              {request.User.firstName} has
                                              requested your help!
                                          </Styled.Group>
                                          <Styled.Group>
                                              <CloseButton
                                                  setRemoveId={setRemoveId}
                                                  removeId={request.id}
                                              />
                                          </Styled.Group>
                                      </Styled.Content>
                                  </Styled.Notification>
                              );
                          } else {
                              return (
                                  <Styled.Notification key={request.id}>
                                      <Styled.Group>
                                          <ProfilePhoto
                                              src="https://picsum.photos/100/100"
                                              size={50}
                                          />
                                      </Styled.Group>
                                      <Styled.Content>
                                          <Styled.Group>
                                              You have requested{' '}
                                              {request.User.firstName} for help!
                                          </Styled.Group>
                                          <Styled.Group>
                                              <CloseButton
                                                  setRemoveId={setRemoveId}
                                                  removeId={request.id}
                                              />
                                          </Styled.Group>
                                      </Styled.Content>
                                  </Styled.Notification>
                              );
                          }
                      })
                    : null}
            </Styled.Notifications>
        </>
    );
};

export default NotificationsPanel;
