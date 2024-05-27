import { ApiUrlPipe } from "./api-url.pipe";
import { CustomCurrencyPipe } from "./custom-currency.pipe";
import { LocaleDatePipe, RemainingWeekPipe } from "./date.pipe";
import { LocalImagePipe } from "./local-image.pipe";
import { HtmlSanitizePipe, ResourceUrlSanitizePipe, ScriptSanitizePipe, StyleSanitizePipe, UrlSanitizePipe } from "./sanitizers.pipe";

export default [
    ApiUrlPipe,
    CustomCurrencyPipe,
    HtmlSanitizePipe,
    UrlSanitizePipe,
    ResourceUrlSanitizePipe,
    ScriptSanitizePipe,
    StyleSanitizePipe,
    LocaleDatePipe,
    RemainingWeekPipe,
    LocalImagePipe
]