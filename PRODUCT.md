# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who want direct, ongoing conversations with friends, family, or a small circle. This is inferred from the existing app: authenticated one-to-one chat, no public feed, discovery, or broadcast surface.

## Product Purpose

Wari is a small, real-time chat app. Signed-in people can find each other, start a conversation, and keep it going with message history, presence, typing indicators, and read ticks.

## Positioning

A quiet, direct chat space built around the thread rather than the feed. This is inferred from the current product and should be confirmed with the owner.

## Operating Context

Used in a browser on desktop and mobile for everyday check-ins, quick coordination, and conversations that continue across sessions.

## Capabilities and Constraints

- Email and password sign-up and sign-in.
- People search and one-to-one conversation creation.
- Real-time messages over Socket.IO, with typing and presence updates.
- Message history and read ticks for the sender's own messages.
- React 19 with Vite, plain CSS, a Node backend, and Socket.IO.
- Attachments are not implemented in the current UI or backend. The old attachment button was decorative and has been removed rather than left as a dead control.
- No group chat, reactions, message editing, or public profiles in the current app.

## Brand Commitments

The product name is Wari. No logo system, brand guidelines, or marketing assets exist in the repository.

## Evidence on Hand

The app itself is the only evidence. No testimonials, customer claims, benchmarks, or marketing assets exist; future work must not invent them.

## Product Principles

- The conversation is the product; keep the path to reading and sending short.
- Familiar chat behavior beats invented affordances.
- Make state visible: who is online, who is typing, what was sent, what is selected.
- Keep the surface quiet enough to use every day.

## Accessibility & Inclusion

Keyboard focus must remain visible, reduced motion must be respected, text contrast must remain readable, and touch targets must stay usable on small screens.

## Open Decisions

- What "Wari" means, if anything, beyond the product name.
- Whether attachments, group conversations, or richer read receipts are planned.
