const handleResponse = async (response) => {
  if (response.status >= 500) throw 'Get 5xx from cmp service!';

  let data = {};
  try {
    data = await response.json();
    if (data.detail && data.detail.constructor === Object) {
      let detail_msg = '';
      Object.entries(data.detail).forEach(([key, value]) => {
        detail_msg += `* ${key}: ${value.toString()}\n`;
      });
      data.detail = detail_msg;
    } else if (data.non_field_errors) {
      data.detail = data.non_field_errors.toString();
    }
  } catch (error) {
    data = { detail: response.statusText };
  }
  return {
    status: response.status,
    data: data,
  };
};

export const postMixin = async (url, body) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      status: 500,
      data: { detail: 'Something went wrong!' },
    };
  }
};

export const getMixin = async (url) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    // With slow api, waitime here, not at await response.json()
    return await handleResponse(response);
  } catch (error) {
    return {
      status: 500,
      data: { detail: 'Something went wrong!' },
    };
  }
};

export const patchMixin = async (url, body) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body),
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      status: 500,
      data: { detail: 'Something went wrong!' },
    };
  }
};

export const deleteMixin = async (url) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
    return await handleResponse(response);
  } catch (error) {
    return {
      status: 500,
      data: { detail: 'Something went wrong!' },
    };
  }
};
