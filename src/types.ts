import type { ComponentType } from 'react'

/** The unique id of every launchable desktop application. */
export type AppId = 'about' | 'skills' | 'projects' | 'contact' | 'welcome' | 'site-info'

/** A screen coordinate / size pair. */
export interface Point {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

/**
 * Static metadata describing an app that can be opened from the desktop.
 * The desktop icons and the window chrome are both generated from this.
 */
export interface AppDefinition {
  id: AppId
  title: string
  /** Path (under /public) of the desktop icon image. */
  icon: string
  /** The React component rendered inside the window body. */
  Component: ComponentType
  /** Default size of the window when first opened. */
  defaultSize: Size
  /** Whether the app should appear as a folder on the desktop. */
  showOnDesktop?: boolean
}

/** The live, mutable state of a single open window instance. */
export interface WindowState {
  id: AppId
  position: Point
  size: Size
  /** Stacking order — the highest value is the focused window. */
  z: number
  minimized: boolean
  activePage: 'content' | 'settings'
  settingsOpen: boolean
  /** Size/position to go back to after the green button filled the screen. */
  restore?: { position: Point; size: Size }
}

export interface AppSettings {
  theme: 'light' | 'dark'
  textSize: number
}
