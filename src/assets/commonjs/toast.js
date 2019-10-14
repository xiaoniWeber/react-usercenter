//轻提示组件

import 'vant/lib/index.css'
import { Toast } from 'vant'
export function toast(message, duration = 1000) {
    Toast({
        message, duration
    });
  }