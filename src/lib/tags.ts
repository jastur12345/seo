// Google Ads tag IDs. These are public (they appear in every page's source once the tag loads),
// so they're committed as defaults — the site tracks correctly even if the hosting provider's
// env vars are missing. NEXT_PUBLIC_* env vars still override them (e.g. for a different account).
// Created by new_setup-conv-tracking.md on 2026-11-10: conversion action 7897074421 "Lead · Form Submit".

const clean = (v: string | undefined) => (v ?? "").trim().replace(/^["']|["']$/g, "").trim();

export const GTAG_ID = clean(process.env.NEXT_PUBLIC_GTAG_ID) || "AW-18413160118";
export const CONVERSION_LABEL =
  clean(process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL) || "AW-18413160118/_HFsCPWVz7UdELaNisxE";
