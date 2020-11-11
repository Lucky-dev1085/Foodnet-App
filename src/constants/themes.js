import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const themes = {
    LIGHT: {
        PRIMARY: '#FFFFFF',
        SECONDARY: '#DDDDDD'
    },
    DARK: {
        PRIMARY: '#000000',
        SECONDARY: '#555555'
    },
    BLUE: {
        PRIMARY: '#7FE2ED',
        SECONDARY: '#659FF8'
    },
    PINK: {
        PRIMARY: '#F382EB',
        SECONDARY: '#E62FC7'
    }
};

export const colors = {
    TRANSPARENT: 'transparent',
    WHITE: '#FFF',
    BLACK: '#000',
    RED: {
        DEFAULT: 'red',
        PRIMARY: '#EA4A4A',
    },
    GREEN: {
        DEFAULT: 'green',
        PRIMARY: '#45AB62',
    },
    BLUE: {
        DEFAULT: 'blue',
        PRIMARY: '#0386E1',
    },
    GREY: {
        DEFAULT: '#243235',
        PRIMARY: '#C4C4C4',
        SECONDARY: '#EFEFEF',
    },
    YELLOW: {
        DEFAULT: 'yellow',
        PRIMARY: '#F78F1E',
        C444: '$444444'
    }
}

export const common = StyleSheet.create({
    container: {
        flex: 1,
    },

    width10: {
        width: 10
    },
    width20: {
        width: 20
    },
    width100P: {
        width: '100%'
    },

    height50: {
        height: 50
    },

    marginTop10: {
        marginTop: 10
    },
    marginTop25: {
        marginTop: 25
    },
    marginTop35: {
        marginTop: 35
    },
    marginTop50: {
        marginTop: 50,
    },
    marginLeftM20: {
        marginLeft: -20
    },

    borderWidth1D5: {
        borderWidth: 1.5
    },

    underLine: {
        textDecorationLine: 'underline'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.WHITE
    },
    headerLeft: {
        alignItems: 'flex-start',
        paddingLeft: 10,
        width: '20%'
    },
    headerLeftIcon: {
        width: 25,
        height: 25
    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%'
    },
    headerTitleText: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.BLACK,
        textAlign: 'center'
    },
    headerRight: {
        alignItems: 'flex-end',
        paddingRight: 10,
        width: '20%'
    },

    backColorYellow: {
        backgroundColor: colors.YELLOW.PRIMARY
    },
    backColorWhite: {
        backgroundColor: colors.WHITE
    },
    backColorGrey: {
        backgroundColor: colors.GREY.PRIMARY
    },

    fontColorWhite: {
        color: colors.WHITE
    },
    fontColorBlack: {
        color: colors.BLACK
    },
    fontColorYellow: {
        color: colors.YELLOW.PRIMARY
    },
    fontColorRed: {
        color: colors.RED.PRIMARY
    },
    fontColorGrey: {
        color: colors.GREY.PRIMARY
    },
    fontColor444: {
        color: colors.GREY.C444
    },

    borderColorWhite: {
        borderColor: colors.WHITE
    },
    borderColorGrey: {
        borderColor: colors.GREY.PRIMARY
    },
    borderColorRed: {
        borderColor: colors.RED.PRIMARY
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});