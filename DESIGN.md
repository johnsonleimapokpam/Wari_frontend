# Wari design system

## Direction

**Signal & Paper.** Wari is a correspondence room, not a dashboard. The interface is built from three materials: deep ink for the outer frame, a cool paper ground for the conversation, and a single cobalt signal for actions and the sender's own voice. Marigold is the human mark: presence, selection, the brand dot, and the small moments that ask for attention.

The old purple SaaS look was treated as evidence, not authority. The replacement keeps the product truth and every workflow, but changes the world around it.

## Color

| Token | Value | Job |
| --- | --- | --- |
| `--paper` | `#eef0e8` | Main conversation ground |
| `--paper-raised` | `#f7f7f1` | Header and composer bands |
| `--paper-deep` | `#e2e5d9` | Hover, skeletons, quiet fills |
| `--white` | `#fffdf8` | Incoming messages and inputs |
| `--ink` | `#171a16` | Text and sidebar frame |
| `--ink-soft` | `#242820` | Strong text on paper |
| `--ink-muted` | `#5c6156` | Secondary text and metadata |
| `--line` | `#d2d6c8` | Hairline rules |
| `--line-strong` | `#aeb4a4` | Input borders and disabled fills |
| `--cobalt` | `#1f4ed8` | Primary action, own messages, links, focus |
| `--cobalt-deep` | `#163aa8` | Hover and active primary action |
| `--signal` | `#e8a317` | Brand dot, selection, focus on dark |
| `--moss` | `#2f7d5a` | Online presence |
| `--clay` | `#b7452d` | Error text and error surfaces |

Color is restrained: cobalt carries action and identity, marigold marks attention, and the neutral field stays quiet enough for daily use. Text on the dark sidebar is tinted from the sidebar hue rather than grey.

## Type

- **Display:** Bricolage Grotesque, 700. Used only for the brand, auth headline, empty-state headline, and modal title.
- **UI and body:** Public Sans, 400/500/600/700. Used for labels, inputs, conversation rows, message bodies, buttons, and metadata.

The two families have separate jobs. Display type is never used for labels, buttons, or data. The scale is fixed rather than fluid: 11, 12, 13, 15, 18, 24, 32, and 48px roles. Message bodies sit at 15px with a 1.5 line height and a maximum measure of 62 characters. Headings use `text-wrap: balance`; body copy uses normal wrapping.

## Layout

- Sidebar: 320px on desktop, 288px below 1100px, full-screen overlay below 680px.
- Conversation column: 860px maximum, centered in the chat pane. The header, message list, typing indicator, and composer all share that measure.
- Auth: split view above 680px, with the ink brand panel on the left and the form on the paper ground. Below 680px the brand panel gives way to a compact mobile wordmark.
- Spacing follows a 4px base scale. Tight message groups use 2px, sender changes use 10px, and date groups use 24px above.
- Structure is linear and predictable. The sidebar is navigation, the header is identity and presence, the list is the thread, and the composer is the only action band.

## Components

- **Avatars:** deterministic color from the person's id across five tones (cobalt, marigold, clay, moss, plum). Initials only.
- **Conversation rows:** full-width buttons. The active row inverts to paper on the ink sidebar; there is no colored left border.
- **Messages:** own messages are cobalt with a 4px tail corner; incoming messages are white with a 1px rule and the mirrored tail. Consecutive messages from the same sender within five minutes tighten to 2px.
- **Composer:** auto-growing textarea, one cobalt send button, no dead attachment control. Enter sends; Shift+Enter adds a line.
- **Modal:** a paper sheet with a soft offset shadow and a dimmed overlay. Escape closes it.
- **Icons:** one authored SVG set at a 1.8px stroke. No emoji as icons.
- **States:** hover, focus, active, disabled, loading, error, and empty states are defined for every interactive component. Loading uses skeletons rather than centered spinners.

## Motion

Motion only communicates state. Hover and focus transitions run at 140–180ms; the mobile panel slide runs at 240ms with an exponential ease-out. Typing dots rise and settle. There is no page-load choreography and no entrance animation on every section. `prefers-reduced-motion` removes all but the essential state change.

## Accessibility

- Visible focus rings on every interactive control; marigold on the ink sidebar, cobalt on paper.
- Text and placeholder contrast checked against their surfaces.
- Touch targets at least 36px, with 44px for primary inputs and the send action.
- The message list is a polite log; the typing indicator is a status region; errors use `role="alert"`.
- Conversation rows and search results are buttons, not clickable divs.
- The dialog has `role="dialog"`, `aria-modal`, a labelled title, initial focus, and an Escape path.
- Scrollbars, selection, caret, and focus rings are themed from the same palette.
