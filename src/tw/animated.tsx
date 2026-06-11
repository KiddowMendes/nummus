import Animated from "react-native-reanimated";
import { ScrollView as RNScrollView } from "react-native";
import { useCssElement } from "react-native-css";

const AnimatedRNScrollView = Animated.createAnimatedComponent(RNScrollView);

export const AnimatedScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  }
) => {
  return useCssElement(AnimatedRNScrollView, props, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  });
};

export { Animated };
