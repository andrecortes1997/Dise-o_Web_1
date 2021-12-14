import { Content, Footer, Header, Sidebar } from 'components/Layout';
import { Redirect } from 'react-router-dom';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import { getToken } from '../../services/API';
import jwt_decode from 'jwt-decode';

class MainLayout extends React.Component {
  state = {
    isAuth: true,
    token: getToken(),
    isValidToken: true,
  };

  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  checkToken() {
    const { token, isValidToken } = this.state;

    if (token) {
      const decodedToken = jwt_decode(token);
      const currentDate = new Date();
      const expiryDate = new Date(decodedToken.exp * 1000);

      this.setState({
        isValidToken: expiryDate < currentDate.getTime() ? false : true,
      });

      if (!isValidToken) {
        localStorage.clear();
        console.log('Component Did Mount: Token Expired');
      }

      this.setState({ isAuth: isValidToken });
    } else {
      console.log('Component Did Mount: No Token');
      this.setState({ isAuth: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { token, isValidToken } = this.state;
    if (prevState.token !== token || prevState.isValidToken !== isValidToken) {
      this.checkToken();
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
    this.checkToken();

    // setTimeout(() => {
    //   if (!this.notificationSystem) {
    //     return;
    //   }

    //   this.notificationSystem.addNotification({
    //     title: <MdImportantDevices />,
    //     message: 'Welome to Reduction Admin!',
    //     level: 'info',
    //   });
    // }, 1500);

    // setTimeout(() => {
    //   if (!this.notificationSystem) {
    //     return;
    //   }

    //   this.notificationSystem.addNotification({
    //     title: <MdLoyalty />,
    //     message:
    //       'Reduction is carefully designed template powered by React and Bootstrap4!',
    //     level: 'info',
    //   });
    // }, 2500);
  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          {this.state.isAuth ? children : <Redirect to="/login" />}
          <Footer />
        </Content>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </main>
    );
  }
}

export default MainLayout;
