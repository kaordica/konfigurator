import {
  createStyles,
  Drawer,
  IconButton,
  Theme,
  Tooltip,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import FormatIcon from '@material-ui/icons/FormatColorTextRounded';
import ParagraphIcon from '@material-ui/icons/ShortTextRounded';
import RestoreIcon from '@material-ui/icons/RestoreFromTrashRounded';
import SpellcheckIcon from '@material-ui/icons/SpellcheckRounded';
import TitleIcon from '@material-ui/icons/TitleRounded';
import ColorsIcon from '@material-ui/icons/ColorLensRounded';
import { Link } from '@reach/router';
import * as React from 'react';
import { EConfigSpaces, IUserTheme } from '../../../RootContainer';
import {
  NoParamsAny,
  TChangeConfigSpace,
  TInputHandler,
} from '../../../utils/types';
import { ResetDialog } from './ResetDialog';

export interface ISidebarProps extends WithStyles<typeof styles> {
  userTheme: IUserTheme;
  activeSpace: EConfigSpaces | undefined;
  changeSpace: TChangeConfigSpace;
  resetTheme: NoParamsAny;
}

export interface ISidebarState {
  isResetDialogOpen: boolean;
}

export const fixedSidebarWidth = 70;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: fixedSidebarWidth,
      padding: '10px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
    },
    spacer: theme.mixins.toolbar,
    activeIcon: {
      color: theme.palette.primary.main,
      transition: `.${theme.transitions.duration.standard}s ${
        theme.transitions.easing.easeIn
      }`,
    },
    inactiveIcon: {
      color: theme.palette.grey['400'],
      transition: `.${theme.transitions.duration.standard}s ${
        theme.transitions.easing.easeIn
      }`,
    },
  });

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  public state = {
    isResetDialogOpen: false,
  };

  public toggleModal = () => {
    this.setState(prevState => ({
      isResetDialogOpen: !prevState.isResetDialogOpen,
    }));
  };

  public render() {
    const { classes, changeSpace, activeSpace, resetTheme } = this.props;
    const availableSpaces = [
      {
        space: EConfigSpaces.typography,
        icon: (isActive: boolean) => (
          <FormatIcon className={isActive ? classes.activeIcon : ''} />
        ),
        title: 'Tipografia básica',
      },
      {
        space: EConfigSpaces.body,
        icon: (isActive: boolean) => (
          <ParagraphIcon className={isActive ? classes.activeIcon : ''} />
        ),
        title: 'Corpo do texto',
      },
      {
        space: EConfigSpaces.headings,
        icon: (isActive: boolean) => (
          <TitleIcon className={isActive ? classes.activeIcon : ''} />
        ),
        title: 'Cabeçalhos',
      },
      {
        space: EConfigSpaces.colors,
        icon: (isActive: boolean) => (
          <ColorsIcon className={isActive ? classes.activeIcon : ''} />
        ),
        title: 'Cores',
      },
    ];
    return (
      <>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.spacer} />
          <div style={{ flex: 1 }}>
            {availableSpaces.map(s => (
              <div key={s.title}>
                <Tooltip title={s.title} placement="right">
                  <IconButton onClick={changeSpace(s.space)}>
                    {s.icon(activeSpace === s.space)}
                  </IconButton>
                </Tooltip>
              </div>
            ))}
          </div>
          <div>
            <Tooltip title="Exportar configurações" placement="right">
              <Link to="/export">
                <IconButton>
                  <SpellcheckIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Resetar configurações" placement="right">
              <IconButton onClick={this.toggleModal}>
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Drawer>
        <ResetDialog
          closeModal={this.toggleModal}
          resetTheme={resetTheme}
          isOpen={this.state.isResetDialogOpen}
        />
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
