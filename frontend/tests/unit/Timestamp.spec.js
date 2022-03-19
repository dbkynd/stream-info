import { shallowMount } from '@vue/test-utils';
import Timestamp from '@/components/Timestamp';

describe('Date Component', () => {
  test('Under one minute', () => {
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => new Date(),
        },
      },
      propsData: {
        date: Date.now() - 1000 * 50,
      },
    });

    expect(wrapper.text()).toBe('Less than a minute ago');
  });

  test('singular minute', () => {
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => new Date(),
        },
      },
      propsData: {
        date: Date.now() - 1000 * 60,
      },
    });

    expect(wrapper.text()).toBe('1 minute ago');
  });

  test('multiple minutes', () => {
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => new Date(),
        },
      },
      propsData: {
        date: Date.now() - 1000 * 60 * 5,
      },
    });

    expect(wrapper.text()).toBe('5 minutes ago');
  });

  test('single hour', () => {
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => new Date(),
        },
      },
      propsData: {
        date: Date.now() - 1000 * 60 * 65,
      },
    });

    expect(wrapper.text()).toBe('1 hour ago');
  });

  test('multiple hours', () => {
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => new Date(),
        },
      },
      propsData: {
        date: Date.now() - 1000 * 60 * 60 * 5,
      },
    });

    expect(wrapper.text()).toBe('5 hours ago');
  });

  test('formatted to PT when over 24 hours', () => {
    const date = new Date('2000-01-02 05:00:00');
    const wrapper = shallowMount(Timestamp, {
      computed: {
        ...Timestamp.computed,
        now: {
          get: () => date,
        },
      },
      propsData: {
        date: date - 1000 * 60 * 60 * 24 - 1000,
      },
    });

    expect(wrapper.text()).toBe('4:59am 1/1/00');
  });
});
