
import React, { useMemo } from 'react';
import { Box, Text, color } from 'folds';
import { useSearchParams } from 'react-router-dom';
import { useAuthFlows } from '../../../hooks/useAuthFlows';
import { useParsedLoginFlows } from '../../../hooks/useParsedLoginFlows';
import { PasswordLoginForm } from './PasswordLoginForm';
import { LoginPathSearchParams } from '../../paths';

const useLoginSearchParams = (searchParams: URLSearchParams): LoginPathSearchParams =>
  useMemo(
    () => ({
      username: searchParams.get('username') ?? undefined,
      email: searchParams.get('email') ?? undefined,
    }),
    [searchParams]
  );

export function Login() {
  const { loginFlows } = useAuthFlows();
  const [searchParams] = useSearchParams();
  const loginSearchParams = useLoginSearchParams(searchParams);
  const parsedFlows = useParsedLoginFlows(loginFlows.flows);

  return (
    <Box direction="Column" gap="500">
      <Text size="H2" priority="400">
        Вход в систему
      </Text>

      {parsedFlows.password ? (
        <PasswordLoginForm
          defaultUsername={loginSearchParams.username}
          defaultEmail={loginSearchParams.email}
        />
      ) : (
        <Text style={{ color: color.Critical.Main }}>
          Сервер не поддерживает вход по логину и паролю.
        </Text>
      )}
    </Box>
  );
}
