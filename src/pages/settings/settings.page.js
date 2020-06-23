import React, { useContext, useState, useEffect } from "react";
import { AppContext } from '../../context/app.context';
import { useHistory } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  StarOutlined,
  AuditOutlined,
  FacebookOutlined,
  InstagramOutlined,
  EditOutlined
} from '@ant-design/icons';
import usericonpng from '../../assets/gif/user-icon.png';
import notificonpng from '../../assets/gif/notif-icon.png';
import legaliconpng from '../../assets/gif/legal-icon.png';
import feebdbackiconpng from '../../assets/gif/feedback-icon.png';
import helpiconpng from '../../assets/gif/help-icon.png';
import socialiconpng from '../../assets/gif/social-icon.png';
import settingsiconpng from '../../assets/gif/settings-icon.png';
import { Avatar } from 'antd';
import { FancyHeader, ImagePreviewComponent } from "../../components";
import {
  SettingsPageWrapper,
  ProfileInfoWrapper,
  SectionWrapper,
  IconNotificationNumberWrapper,
  ImageUpload,
  IconProfileWrapper,
  LogOutWrapper
} from './settings.style';

import { ListItem } from '../../components';

export default function SettingsPage() {
  const { user, signout, notifications, updateProfile, setUser } = useContext(AppContext);
  let history = useHistory();
	const [notificatioNumber, setNotificationNumber] = useState(0);
  const [constatareAmiabilaPhoto, setConstatareAmiabilaPhoto] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
		if (notifications) {
      setNotificationNumber(notifications.length);
      console.log(user);
		}
    }, [notifications]);

  const onImageChange = event => {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          setProfileImage(reader.result);
          const formData = {
            email: user.user.email,
            Nume: user.user.firstname,
            Prenume: user.user.lastname,
            numar_telefon: user.user.phone,
            avatar: reader.result,
            userId: user.user.id,
          };

          updateProfile(formData);
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <SettingsPageWrapper>
      <ProfileInfoWrapper>
        <LogOutWrapper className="LogoutClass"  onClick={() => {
    				  signout();
      				}} >LOGOUT</LogOutWrapper>
        <Avatar  src={profileImage ? profileImage : user.profile.avatar_base_url} size={75} icon={<UserOutlined />} />
        <span className="LastNameUserClass">Salut, {user.user.lastname}!</span>
        <span className="RoleUserClass">{user.role}</span>
        <ImageUpload>
          <label htmlFor="file-input">
            <IconProfileWrapper> <EditOutlined />   </IconProfileWrapper>

           </label>
          <input id="file-input" onChange={onImageChange} type="file" name="file" accept="image/*" capture="camera" />
        </ImageUpload>

      </ProfileInfoWrapper>
      {/* Settings */}
        <h1>General</h1>
      <SectionWrapper className="Section1Setting">
        <ListItem
          title='Profil'
          //subtitle='Configureaza-ti profilul'
          icon={<img src={usericonpng} />}
          action={() => history.push('/profile')}
        />

        <ListItem
          title='Legal'
          //subtitle='Documente legale'
          icon={<img src={legaliconpng} />}
          action={() => history.push('/legal')}
        />
        <ListItem
          title='Social'
          //subtitle='Lasa-ne un review'
          icon={<FacebookOutlined />}
          action={() => console.log('alo')}
        />
        <ListItem
          title='Feedback'
          //subtitle='Lasa-ne un review'
          icon={<img src={feebdbackiconpng} />}
          action={() => console.log('alo')}
        />
        <ListItem
          title='Settings'
          //subtitle='Lasa-ne un review'
          icon={<img src={settingsiconpng} />}
          action={() => console.log('alo')}
        />
        <ListItem
          title='Notifications'
        //  subtitle='Vezi toate notificarile'
          icon={<div><img src={notificonpng} /> <IconNotificationNumberWrapper> {notificatioNumber} </IconNotificationNumberWrapper> </div> }
          action={() => history.push('/notification')}
        />
        <ListItem
          title='Help'
          //subtitle='Lasa-ne un review'
          icon={<img src={helpiconpng} />}
          action={() => console.log('alo')}
        />
      </SectionWrapper>

      {/* <ListItem
        title='Logout'
        subtitle='Delogheaza-te'
        icon={<LogoutOutlined />}
        action={() => signout()}
      /> */}
    </SettingsPageWrapper>
  );
}
