/// <reference types="vite/client" />

/**
 * Wordt door vite.config.ts vervangen door de letterlijke waarde true of false.
 * Staat hij op false, dan gooit de bundelaar het dev-paneel er helemaal uit.
 */
declare const __DEV_TOOLS__: boolean

/**
 * Alleen de overslaan-knop op het inlogscherm. Losse vlag, omdat die knop wél
 * op productie mag staan en het dev-paneel niet.
 */
declare const __ALLOW_SKIP_LOGIN__: boolean
