export const initialTimeState = {
    duration: 0,
    timer: false,
    isValid: true,
    timeLeft: -1,   
}

export function timeReducer(state, action) {
    switch (action.type) {
        case "SET_TIME_LEFT": {
            const {timeLeft} = action.payload;

            return {
                ...state,
                timeLeft: timeLeft,
            }
        }

        case "SET_DURATION": {
            const {value} = action.payload;

            return {
                ...state,
                duration: value,
            }
        }

        case "SET_IS_VALID": {
            const {isValid} = action.payload;
            
            return {
                ...state,
                isValid: isValid
            }
        }

        case "SET_TIMER": {
            const {checked} = action.payload;

            return {
                ...state,
                timer: checked,
            }
        }

        case "RESET_TIMER": {
            return initialTimeState;
        }

        default: {
            return state;
        }
    }
}
