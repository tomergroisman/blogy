import 'react-native-get-random-values';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { styleConfig } from './src/styles/FoundationConfig';

// Set style configuration
styleConfig();

// Set navigation configuration
registerScreens();
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'blog.PostsList',
                        }
                    }
                ],
            }
        }
    });
});