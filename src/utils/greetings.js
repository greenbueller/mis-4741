

export const defaultGreeting = 'Welcome!';

// Get a time-based greeting based on the current hour and user's display name
// This should never be seen, as the user should always have a display name if on a page that this would be called on
export function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return `Good morning!`;
    } else if (hour < 18) {
        return `Good afternoon!`;
    } else {
        return `Good evening!`;
    }
}

// Get a contextual greeting based on the current page or context
export function getContextualGreeting(context = 'default') {
    const contextGreetings = {
        default: `Welcome!`,
        home: `Welcome! Please fill out the claim form below`
    };
    
    return contextGreetings[context] || contextGreetings.default;
}

// Export a simple function that components can call
export function generateGreeting(context = 'default') {
    return getContextualGreeting(context);
}