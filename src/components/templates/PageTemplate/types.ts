import { ReactNode } from "react";

export interface IPageTemplate {
  mustScroll?: boolean;
  headerText?: string;
  onTouchablePress?: () => void;
  onHeaderClick?: () => void;
  underlined?: boolean;
  bottomIcon?: ReactNode;
  hasMenu?: boolean;
  isBlurOn?: boolean;
  isWholeBlurOn?: boolean;
}
