import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { TextField } from 'react-native-material-textfield';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { setToken } from '@modules/reducers/auth/actions';
import { Loading } from '@components';
import { AuthService } from '@modules/services';
import { isEmpty, validateName, validateEmail, validatePassword, validateLength } from '@utils/functions';
import { common, colors } from '@constants/themes';
import { BackIcon } from '@constants/svgs';
import i18n from '@utils/i18n';

export default SignUp = (props) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [secureTextEntry2, setSecureTextEntry2] = useState(true);
    const [termOfService, setTermOfService] = useState(false);
    const [newsLetter, setNewsLetter] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        (isEmpty(name) || !validateName(name)) ? setErrorName('Name is not valid') : setErrorName('');
        (isEmpty(email) || !validateEmail(email)) ? setErrorEmail(i18n.translate('Email is not valid')) : setErrorEmail('');
        (isEmpty(password) ||!validateLength(password, 3)) ? setErrorPassword(i18n.translate('Incorrect password')) : setErrorPassword('');
        (isEmpty(confirm) || !validateLength(confirm, 3)) ? setErrorConfirm(i18n.translate('Incorrect password')) : password !== confirm ? setErrorConfirm(i18n.translate('The two passwords do not match')) : setErrorConfirm('');
    }, [name, email, password, confirm]);

    const onSignup = async () => {
        setLoading(true);
        await AuthService.register(name, email, password, newsLetter ? 1 : 0)
            .then((response) => {
                if (response.status == 201) {
                    setLoading(false);
                    dispatch(setToken(response.result[0].token));
                    props.navigation.navigate('App');
                } else {
                    Toast.show(response.msg, Toast.LONG);
                    setTimeout(() => setLoading(false), 1000);
                }
            })
            .catch((error) => {
                Toast.show(error.message, Toast.LONG);
                setTimeout(() => setLoading(false), 1000);
            });
    }

    return (
        <Container style={common.container}>
            <StatusBar />
            <Loading loading={loading} />
            <Header style={common.header}>
                <View style={common.headerLeft}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <BackIcon style={common.headerLeftIcon} />
                    </TouchableOpacity>
                </View>
                <View style={common.headerTitle}>
                    <Text style={common.headerTitleText}>{i18n.translate('Registration')}</Text>
                </View>
                <View style={common.headerRight} />
            </Header>
            <Content style={styles.content}>
                <View style={styles.inputView}>
                    <Text style={[styles.labelText, !isEmpty(errorName) ? common.fontColorRed : common.fontColorBlack]}>{i18n.translate('Name')}</Text>
                    <TextField
                        keyboardType='default'
                        returnKeyType='next'
                        fontSize={16}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        value={name}
                        error={errorName}
                        containerStyle={[styles.textContainer, !isEmpty(errorName) ? common.borderColorRed : common.borderColorGrey]}
                        inputContainerStyle={styles.inputContainer}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                <View style={[styles.inputView, common.marginTop50]}>
                    <Text style={[styles.labelText, !isEmpty(errorEmail) ? common.fontColorRed : common.fontColorBlack]}>{i18n.translate('E-mail')}</Text>
                    <TextField
                        keyboardType='email-address'
                        autoCapitalize='none'
                        returnKeyType='next'
                        fontSize={16}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        value={email}
                        error={errorEmail}
                        containerStyle={[styles.textContainer, !isEmpty(errorEmail) ? common.borderColorRed : common.borderColorGrey]}
                        inputContainerStyle={styles.inputContainer}
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <View style={[styles.inputView, common.marginTop50]}>
                    <Text style={[styles.labelText, !isEmpty(errorPassword) ? common.fontColorRed : common.fontColorBlack]}>{i18n.translate('Password')}</Text>
                    <Text style={styles.characterText}>{i18n.translate('5+ characters')}</Text>
                    <TextField
                        autoCapitalize='none'
                        returnKeyType='next'
                        fontSize={16}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={true}
                        value={password}
                        error={errorPassword}
                        secureTextEntry={secureTextEntry1}
                        containerStyle={[styles.textContainer, !isEmpty(errorPassword) ? common.borderColorRed : common.borderColorGrey]}
                        inputContainerStyle={styles.inputContainer}
                        renderRightAccessory={() => {
                            let name = secureTextEntry1 ? 'eye' : 'eye-off';
                            return (
                                <Icon name={name} type='feather' size={24} color={TextField.defaultProps.baseColor} onPress={() => setSecureTextEntry1(!secureTextEntry1)} />
                            )
                        }}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <View style={[styles.inputView, common.marginTop50]}>
                    <Text style={[styles.labelText, !isEmpty(errorConfirm) ? common.fontColorRed : common.fontColorBlack]}>{i18n.translate('New password again')}</Text>
                    <Text style={styles.characterText}>{i18n.translate('5+ characters')}</Text>
                    <TextField
                        autoCapitalize='none'
                        returnKeyType='done'
                        fontSize={16}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={true}
                        value={confirm}
                        error={errorConfirm}
                        secureTextEntry={secureTextEntry2}
                        containerStyle={[styles.textContainer, !isEmpty(errorConfirm) ? common.borderColorRed : common.borderColorGrey]}
                        inputContainerStyle={styles.inputContainer}
                        renderRightAccessory={() => {
                            let name = secureTextEntry2 ? 'eye' : 'eye-off';
                            return (
                                <Icon name={name} type='feather' size={24} color={TextField.defaultProps.baseColor} onPress={() => setSecureTextEntry2(!secureTextEntry2)} />
                            )
                        }}
                        onChangeText={(value) => setConfirm(value)}
                    />
                </View>
                <TouchableOpacity style={styles.rememberMe} onPress={() => setTermOfService(!termOfService)}>
                    <Icon
                        type='material-community'
                        name={termOfService ? 'check-box-outline' : 'checkbox-blank-outline'}
                        size={25}
                        color={colors.GREY.PRIMARY}
                    />
                    <Text style={styles.rememberText}>{i18n.translate('I accept the ')}
                        <Text style={[styles.rememberText, common.fontColorYellow, common.underLine]} onPress={() => alert('OK')}>{i18n.translate('Terms and Conditions')}</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rememberMe, common.marginTop10]} onPress={() => setNewsLetter(!newsLetter)}>
                    <Icon
                        type='material-community'
                        name={newsLetter ? 'check-box-outline' : 'checkbox-blank-outline'}
                        size={25}
                        color={colors.GREY.PRIMARY}
                    />
                    <Text style={styles.rememberText}>{i18n.translate('I subscribe to the newsletter')}</Text>
                </TouchableOpacity>
                <View style={[styles.buttonView, common.marginTop35]}>
                    <TouchableOpacity
                        disabled={isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(confirm) || errorName || errorEmail || errorPassword || errorConfirm || !termOfService ? true : false}
                        style={[common.button, (isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(confirm) || errorName || errorEmail || errorPassword || errorConfirm || !termOfService) ? common.backColorGrey : common.backColorYellow]}
                        onPress={() => onSignup()}
                    >
                        <Text style={[common.buttonText, common.fontColorWhite]}>{i18n.translate('Registration')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={common.height50} />
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 20
    },
    inputView: {
        marginTop: 20,
        width: '100%'
    },
    labelView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.BLACK
    },
    characterText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '400',
        color: '#666'
    },
    textContainer: {
        width: '100%',
        marginTop: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        paddingRight: 20,
    },
    inputContainer: {
        marginTop: -10,
        borderWidth: 0
    },
    rememberMe: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40,
        width: '100%',
    },
    rememberText: {
        marginLeft: 10,
        fontSize: 16,
        paddingRight: 30,
    },
    buttonView: {
        width: '100%',
        alignItems: 'center'
    },
});
