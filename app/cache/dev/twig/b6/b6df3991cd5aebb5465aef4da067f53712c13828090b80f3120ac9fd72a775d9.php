<?php

/* @Framework/Form/button_widget.html.php */
class __TwigTemplate_7aa11528279c956ecc3bb05363745b8792c55185386b078943d7e12501b55a5b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_98be18a1939a18a57c7d81dac84804a7346f088a3e47ada5446e131f4e4e0403 = $this->env->getExtension("native_profiler");
        $__internal_98be18a1939a18a57c7d81dac84804a7346f088a3e47ada5446e131f4e4e0403->enter($__internal_98be18a1939a18a57c7d81dac84804a7346f088a3e47ada5446e131f4e4e0403_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/button_widget.html.php"));

        // line 1
        echo "<?php if (!\$label) { \$label = isset(\$label_format)
    ? strtr(\$label_format, array('%name%' => \$name, '%id%' => \$id))
    : \$view['form']->humanize(\$name); } ?>
<button type=\"<?php echo isset(\$type) ? \$view->escape(\$type) : 'button' ?>\" <?php echo \$view['form']->block(\$form, 'button_attributes') ?>><?php echo \$view->escape(false !== \$translation_domain ? \$view['translator']->trans(\$label, array(), \$translation_domain) : \$label) ?></button>
";
        
        $__internal_98be18a1939a18a57c7d81dac84804a7346f088a3e47ada5446e131f4e4e0403->leave($__internal_98be18a1939a18a57c7d81dac84804a7346f088a3e47ada5446e131f4e4e0403_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/button_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (!$label) { $label = isset($label_format)*/
/*     ? strtr($label_format, array('%name%' => $name, '%id%' => $id))*/
/*     : $view['form']->humanize($name); } ?>*/
/* <button type="<?php echo isset($type) ? $view->escape($type) : 'button' ?>" <?php echo $view['form']->block($form, 'button_attributes') ?>><?php echo $view->escape(false !== $translation_domain ? $view['translator']->trans($label, array(), $translation_domain) : $label) ?></button>*/
/* */
