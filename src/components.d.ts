/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface HomePage {
    }
    interface NotificationCenter {
        "messages": any;
    }
    interface PublishNotification {
        "isVisible": boolean;
    }
    interface SubscribeNotification {
        "userMailboxId": string;
    }
}
export interface NotificationCenterCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNotificationCenterElement;
}
export interface PublishNotificationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPublishNotificationElement;
}
export interface SubscribeNotificationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSubscribeNotificationElement;
}
declare global {
    interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {
    }
    var HTMLHomePageElement: {
        prototype: HTMLHomePageElement;
        new (): HTMLHomePageElement;
    };
    interface HTMLNotificationCenterElement extends Components.NotificationCenter, HTMLStencilElement {
    }
    var HTMLNotificationCenterElement: {
        prototype: HTMLNotificationCenterElement;
        new (): HTMLNotificationCenterElement;
    };
    interface HTMLPublishNotificationElement extends Components.PublishNotification, HTMLStencilElement {
    }
    var HTMLPublishNotificationElement: {
        prototype: HTMLPublishNotificationElement;
        new (): HTMLPublishNotificationElement;
    };
    interface HTMLSubscribeNotificationElement extends Components.SubscribeNotification, HTMLStencilElement {
    }
    var HTMLSubscribeNotificationElement: {
        prototype: HTMLSubscribeNotificationElement;
        new (): HTMLSubscribeNotificationElement;
    };
    interface HTMLElementTagNameMap {
        "home-page": HTMLHomePageElement;
        "notification-center": HTMLNotificationCenterElement;
        "publish-notification": HTMLPublishNotificationElement;
        "subscribe-notification": HTMLSubscribeNotificationElement;
    }
}
declare namespace LocalJSX {
    interface HomePage {
    }
    interface NotificationCenter {
        "messages"?: any;
        "onClearMessage"?: (event: NotificationCenterCustomEvent<{}>) => void;
    }
    interface PublishNotification {
        "isVisible"?: boolean;
        "onCancelNotification"?: (event: PublishNotificationCustomEvent<{}>) => void;
        "onPublishNotification"?: (event: PublishNotificationCustomEvent<{}>) => void;
    }
    interface SubscribeNotification {
        "onSubscribeTopic"?: (event: SubscribeNotificationCustomEvent<{}>) => void;
        "userMailboxId"?: string;
    }
    interface IntrinsicElements {
        "home-page": HomePage;
        "notification-center": NotificationCenter;
        "publish-notification": PublishNotification;
        "subscribe-notification": SubscribeNotification;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "home-page": LocalJSX.HomePage & JSXBase.HTMLAttributes<HTMLHomePageElement>;
            "notification-center": LocalJSX.NotificationCenter & JSXBase.HTMLAttributes<HTMLNotificationCenterElement>;
            "publish-notification": LocalJSX.PublishNotification & JSXBase.HTMLAttributes<HTMLPublishNotificationElement>;
            "subscribe-notification": LocalJSX.SubscribeNotification & JSXBase.HTMLAttributes<HTMLSubscribeNotificationElement>;
        }
    }
}
